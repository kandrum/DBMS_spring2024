const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Assuming db is your already configured MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Mou6pree@',
  database: 'Insurence' // Corrected database name
});


// Endpoint to handle the submission of health insurance form
router.post('/api/health-insurance/submit', (req, res) => {
  const {
    userId,
    dateOfBirth,
    gender,
    smokingStatus,
    coverageType,
    preExistingConditions,
    plan, // This now refers to the type of plan: 'premium', 'deductible', or 'out_of_pocket_max'
    startDate,
    endDate
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

  // SQL transaction to ensure both policies and health_insurance tables are updated atomically
  db.getConnection((err, connection) => {
    if (err) throw err; // Not connected!

    connection.beginTransaction(err => {
      if (err) {
        connection.release();
        throw err;
      }

      // Insert into policies table first
      const insertPolicyQuery = 'INSERT INTO policies (user_id, policy_type, start_date, end_date, status) VALUES (?, "health", ?, ?, ?)';
      connection.query(insertPolicyQuery, [userId, startDate, endDate, status], (error, results) => {
        if (error) {
          return connection.rollback(() => {
            connection.release();
            throw error;
          });
        }

        const policyId = results.insertId;

        // Then insert into health_insurance table
        const insertHealthInsuranceQuery = 'INSERT INTO health_insurance (health_policy_id, date_of_birth, gender, smoking_status, coverage_type, pre_existing_conditions, plan) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(insertHealthInsuranceQuery, [policyId, dateOfBirth, gender, smokingStatus, coverageType, preExistingConditions, plan], (error, results) => {
          if (error) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({error: "Detailed error message"})
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
