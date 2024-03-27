import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Health() {
  const isLogin = useSelector(state => state.login.isLogin);
  const navigate = useNavigate();

  // Initialize state for form data and quote
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    gender: 'Male',
    smokingStatus: 'non-smoker',
    coverageType: 'individual',
    preExistingConditions: 'no',
    plan: 'premium',
    startDate: '',
    endDate: ''
  });
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [isLogin, navigate]);

  const userId = useSelector((state) => state.userid.userId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/api/health-insurance/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, userId }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(data => {
      alert('Form submitted successfully.');
      // Process your data here. For example, redirect to a confirmation page or reset the form.
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
    });
  }; 

  const handleQuote = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/health-insurance/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setQuote(data.quote);
      
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Date of Birth:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </label>
        <br />
        <label>Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>Smoking Status:
          <select name="smokingStatus" value={formData.smokingStatus} onChange={handleChange}>
            <option value="smoker">Smoker</option>
            <option value="non-smoker">Non-smoker</option>
          </select>
        </label>
        <br />
        <label>Coverage Type:
          <select name="coverageType" value={formData.coverageType} onChange={handleChange}>
            <option value="individual">Individual</option>
            <option value="family">Family</option>
          </select>
        </label>
        <br />
        <label>Pre-existing Conditions:
          <select name="preExistingConditions" value={formData.preExistingConditions} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />
        <label>Plan:
          <select name="plan" value={formData.plan} onChange={handleChange}>
            <option value="premium">Premium</option>
            <option value="deductible">Deductible</option>
            <option value="out_of_pocket_max">Out of Pocket Max</option>
          </select>
        </label>
        <br />
        <label>Start Date:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </label>
        <br />
        <label>End Date:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </label>
        <br />
      <button type="button" onClick={handleQuote}>Get Quote</button>
      <br />
      <button type="submit">Submit</button>
         {quote !== null && <p>Your insurance quote is: ${quote}</p>}
    </form>
  );
}

export default Health;
