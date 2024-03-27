import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Auto() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [formData, setFormData] = useState({
    vehicleType: '',
    make: '', // Added make
    assetActualCost: '', // Added assetActualCost
    year: '',
    dateOfBirth: '',
    mileage: '',
    previousClaims: '',
    claimedAmount: '',
    startDate: '',
    endDate: ''
  });

  const userId = useSelector((state) => state.userid.userId);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuote = () => {
    fetch('http://localhost:8080/api/auto-insurance/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Assuming the backend sends the quote amount in a field named 'quoteAmount'
      setQuote(data.quoteAmount); // Update the state with the received quote amount
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(`An error occurred while fetching the quote: ${error.message}`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/api/auto-insurance/submit', {
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vehicle Type:
        <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
          <option value="">Select Vehicle Type</option>
          <option value="sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="truck">Truck</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
         Make:
        <select name="make" value={formData.make} onChange={handleChange}>
          <option value="">Select Make</option>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Benz">Benz</option>
          <option value="Honda">Honda</option>
          <option value="Mazdaa">Mazdaa</option>
          <option value="Dodge">Dodge</option>
       </select>
    </label>
     <br />

    <label>
      Asset Actual Cost:
      <input
        type="number"
        name="assetActualCost"
        value={formData.assetActualCost}
        onChange={handleChange}
        step="0.01" // Allow decimal values
     />
     </label>
     <br />
      <label>
        Year:
        <input type="number" name="year" value={formData.year} onChange={handleChange} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
      </label>
      <br />
      <label>
        Mileage:
        <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
      </label>
      <br />
      <label>
        Previous Claims:
        <input type="number" name="previousClaims" value={formData.previousClaims} onChange={handleChange} />
      </label>
      <br />
      <label>
        Claimed Amount:
        <input type="number" name="claimedAmount" value={formData.claimedAmount} onChange={handleChange} step="0.01" />
      </label>
      <br />
      <label>
        Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </label>
      <br />
      <button type="button" onClick={handleQuote}>Get Quote</button>
      <br />
      <button type="submit">Submit</button>
         {quote !== null && <p>Your insurance quote is: ${quote}</p>}
    </form>
  );
}

export { Auto };
