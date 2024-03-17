const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a connection pool
const db = mysql.createPool({
  connectionLimit : 10, // the number of connections Node.js will maintain in the pool. Adjust as necessary.
  host            : 'localhost',
  user            : 'root',
  password        : 'Mou6pree@',
  database        : 'Insurence'
});

// No need for db.connect or db.end with a connection pool

router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, mobileNo, address } = req.body;
  const role = 'user'; // Default role

  // Insert user into 'users' table
  const userSql = 'INSERT INTO users (role, password, firstname, lastname, email, dateOfBirth) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(userSql, [role, password, firstName, lastName, email, dateOfBirth], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Error registering user.');
      return;
    }
    
    const userId = result.insertId;
    
    // Now insert address into 'address' table, assuming you have such a table and it's designed to store addresses related to users
    const addressSql = 'INSERT INTO address (user_id, street, city, state, zipcode) VALUES (?, ?, ?, ?, ?)';
    
    // Assuming the `address` received from the front end is an object with street, city, state, and zipCode properties
    db.query(addressSql, [userId, address.street, address.city, address.state, address.zipCode], (err, result) => {
      if (err) {
        console.error('Error adding address:', err);
        res.status(500).send('Error registering user address.');
        return;
      }
      
      res.send({ message: 'Registration successful' });
    });
  });
});

module.exports = router;
