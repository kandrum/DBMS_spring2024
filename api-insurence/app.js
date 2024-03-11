const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Replace these credentials with your actual MySQL Workbench credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mou6pree@',
  database: 'Insurence'
});

db.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
  console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Your SQL statement to select the user with the given username
  const sql = 'SELECT * FROM users WHERE firstname = ?'; // Assuming the username is the email
  db.query(sql, [username], function (err, result) {
    if (err) {
      res.status(500).send('Error on the server.');
      return;
    }
    if (result.length > 0) {
      const user = result[0];

      // This is not secure; replace it with proper password hashing in production
      if (password === user.password) {
        res.send({ message: 'Login successful', user });
      } else {
        res.status(401).send('Password is incorrect');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
