const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const query = 'INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '712123@daS',
    database: 'appointment_ap',
  });

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON data
app.use(express.json());
app.set('view engine', 'ejs')

// Create an appointment
app.post('/appointments', (req, res) => {
    const { name, date, time } = req.body;
    const query = 'INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)';
    db.query(query, [name, date, time], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating appointment' });
      } else {
        res.redirect('/appointments'); // Redirect to the appointments page
      }
    });
  });
  
// Get all appointments
app.get('/appointments', (req, res) => {
    const query = 'SELECT * FROM appointments';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching appointments' });
      } else {
        res.render('appointments', { appointments: results });
      }
    });
  });
 
  

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
