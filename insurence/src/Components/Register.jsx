import React, { useState } from 'react';
import styles from '../styles/Register.module.css'; // Adjust the path as necessary

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // Added password to the form data state
        dateOfBirth: '',
        mobileNo: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.address) {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically handle the form submission,
        // such as sending the data to a backend server for processing.
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                
                <label htmlFor="password">Password:</label> {/* Added password label and input */}
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                
                <label htmlFor="mobileNo">Mobile Number:</label>
                <input type="tel" name="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} />
                
                <label htmlFor="street">Adress::</label>
                <input type="text" name="street" placeholder="Street" value={formData.address.street} onChange={handleChange} />
                <input type="text" name="city" placeholder="City" value={formData.address.city} onChange={handleChange} />
                <input type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleChange} />
                <input type="text" name="zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleChange} />
                
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}

export { Register };
