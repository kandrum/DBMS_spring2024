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

function calculateQuote(vehicleType, year, mileage, previousClaims, claimedAmount, make, assetActualCost) {
    const basePrice = 50;
    let quote = basePrice;
    
    // Check and provide default values for each parameter
    year = Number(year) || new Date().getFullYear(); // Default to current year if invalid
    mileage = Number(mileage) || 0; // Default to 0 if invalid
    previousClaims = Number(previousClaims) || 0; // Default to 0 if invalid
    claimedAmount = Number(claimedAmount) || 0; // Default to 0 if invalid
    assetActualCost = Number(assetActualCost) || 50000; // Default to a reasonable value if invalid
    
    // Depreciation factor
    quote += (new Date().getFullYear() - year) * 20;
    
    // Mileage impact
    quote += mileage * 0.05;
    
    // Reduction for no previous claims
    quote -= previousClaims * 100;
    
    // Increase based on the claimed amount
    quote += claimedAmount * 0.1;
    
    // Adjust quote based on the make of the vehicle
    const makeAdjustment = {
      'Toyota': 0.95,
      'Ford': 0.95,
      'BMW': 1.1,
      'Audi': 1.1,
      'Benz': 1.1,
      'Honda': 0.95,
      'Mazdaa': 0.95,
      'Dodge': 1.0
    };
    quote *= makeAdjustment[make] || 1; // Default multiplier is 1 if make is not listed or invalid
    
    // Adjust quote based on asset's actual cost
    quote += assetActualCost * 0.001; // Adds 0.1% of the car's value to the quote
    
    // Ensure quote isn't less than half of base price
    return Math.max(quote, basePrice * 0.5);
}


router.post('/api/auto-insurance/quote', (req, res) => {

    // Extract make and assetActualCost along with the other parameters from req.body
    const { vehicleType, year, mileage, previousClaims, claimedAmount, userId, make, assetActualCost } = req.body;
    
    // Pass make and assetActualCost to the calculateQuote function
    const quoteAmount = calculateQuote(vehicleType, year, mileage, previousClaims, claimedAmount, make, assetActualCost);

    if (isNaN(quoteAmount)) {
        console.error('Calculated quoteAmount resulted in NaN', { vehicleType, year, mileage, previousClaims, claimedAmount, make, assetActualCost, userId });
        return res.status(400).json({ message: 'Invalid input data, cannot calculate quote.' });
    }

    const quoteQuery = 'INSERT INTO quote_auto (user_id, quote_amount) VALUES (?, ?)';
    db.query(quoteQuery, [userId, quoteAmount], (error, results) => {
        if (error) {
            console.log(error); // Log the error for debugging
            return res.status(500).json({ message: 'Error calculating quote', error: error });
        }
        res.json({ quoteAmount: quoteAmount, id: results.insertId });
    });
});


module.exports = router;
