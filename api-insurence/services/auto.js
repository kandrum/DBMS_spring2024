const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Assuming db is your already configured MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Mou6pree@',
  database: 'Insurence'
});

// Endpoint to handle the submission of auto insurance form
router.post('/api/auto-insurance/submit', (req, res) => {
  const {
    userId, // Assuming this is passed along with the request
    vehicleType,
    make, // Added make
    assetActualCost, // Added assetActualCost
    year,
    mileage,
    previousClaims,
    claimedAmount,
    startDate,
    endDate,
    dateOfBirth // Assuming this is also passed in the request
  } = req.body;

  // Determine the status based on startDate and endDate compared to the current date
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  let status = 'pending'; // Default status
  if (currentDate >= start && currentDate <= end) {
    status = 'active';
  } else if (currentDate > end) {
    status = 'expired';
  }

  // SQL transaction to ensure both policies and auto_insurance tables are updated atomically
  db.getConnection((err, connection) => {
    if (err) throw err; // Not connected!

    connection.beginTransaction(err => {
      if (err) {
        connection.release();
        throw err;
      }

      // Insert into policies table first
      const insertPolicyQuery = 'INSERT INTO policies (user_id, policy_type, start_date, end_date, status) VALUES (?, "auto", ?, ?, ?)';
      connection.query(insertPolicyQuery, [userId, startDate, endDate, status], (error, results) => {
        if (error) {
          return connection.rollback(() => {
            connection.release();
            throw error;
          });
        }

        const policyId = results.insertId;

        // Then insert into auto_insurance table, now including `make` and `asset_actual_cost`
        const insertAutoInsuranceQuery = 'INSERT INTO auto_insurance (auto_policy_id, vehicle_type, make, asset_actual_cost, year, mileage, previous_claims, claimed_amount, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(insertAutoInsuranceQuery, [policyId, vehicleType, make, assetActualCost, year, mileage, previousClaims, claimedAmount, dateOfBirth], (error, results) => {
          if (error) {
            return connection.rollback(() => {
              connection.release();
              throw error;
            });
          }

          // If everything is fine, commit the transaction
          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                throw err;
              });
            }

            connection.release();
            res.json({ message: 'Success', policyId: policyId });
          });
        });
      });
    });
  });
});

module.exports = router;
