const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Configure your MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Mou6pree@',
  database: 'Insurence'
});
// Utility function to calculate age based on date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  // Function to calculate insurance quote based on detailed form data
  function calculateHealthQuote(formData) {
    let baseCost = 100; // Starting base cost
  
    // Calculate age from date of birth
    const age = calculateAge(formData.dateOfBirth);
  
    // Adjust base cost based on the age
    if (age > 50) {
      baseCost += 75;
    } else if (age > 30) {
      baseCost += 50;
    }
  
    // Adjust base cost based on smoking status
    if (formData.smokingStatus === 'smoker') {
      baseCost += 100; // Higher increase for smokers
    }
  
    // Adjust base cost based on coverage type
    if (formData.coverageType === 'family') {
      baseCost *= 1.5; // 50% increase for family coverage
    }
  
    // Adjust base cost for pre-existing conditions
    if (formData.preExistingConditions === 'yes') {
      baseCost += 100; // Higher increase for pre-existing conditions
    }
  
    // Adjustments based on selected plan
    switch (formData.plan) {
      case 'premium':
        baseCost *= 1.2; // 20% increase for premium plan
        break;
      case 'deductible':
        baseCost *= 0.8; // 20% decrease for higher deductible plan
        break;
      case 'out_of_pocket_max':
        baseCost *= 1.1; // 10% increase for better out-of-pocket max coverage
        break;
      default:
        // No adjustment for unknown plans
        break;
    }
  
    // Round to two decimal places
    baseCost = Math.round(baseCost * 100) / 100;
  
    return baseCost;
  }
  

router.post('/api/health-insurance/quote', (req, res) => {
    const formData = req.body;
    try {
      const quote = calculateHealthQuote(formData);
      res.json({ quote }); // Send the quote back to the client
    } catch (error) {
      console.error('Error calculating quote:', error);
      res.status(500).send('Error calculating insurance quote');
    }
  });
  
  module.exports = router;