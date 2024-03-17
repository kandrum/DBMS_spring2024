const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a pool
const db = mysql.createPool({
  connectionLimit : 10, // The number of connections Node.js will maintain in the pool. Adjust as necessary.
  host            : 'localhost',
  user            : 'root',
  password        : 'Mou6pree@',
  database        : 'Insurence'
});

// No need to call db.connect or db.end with a pool.

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE firstname = ?';

  db.query(sql, [username], function (err, result) {
    if (err) {
      res.status(500).json(['Error on the server.']); // Send array response
      return;
    }
    if (result.length > 0) {
      const user = result[0];
      if (password === user.password) {
        // Send message and firstName in an array
        res.json(['Login successful', { firstName: user.firstname }]);
      } else {
        res.status(401).json(['Password is incorrect']); // Send array response
      }
    } else {
      res.status(404).json(['User not found']); // Send array response
    }
  });
});


module.exports = router;
