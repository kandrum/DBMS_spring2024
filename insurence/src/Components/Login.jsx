import React, { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { setLogin } from '../redux/LoginReducer';
import { setUsername as Reduxusername } from '../redux/UsernameReducer';
import backdrop from './image1.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const islogin = useSelector((state) => state.login.isLogin); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogin = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Responce data',data);
      const [message, userDetails] = data; // Destructure the array
      if (message === 'Login successful') {
        dispatch(setLogin(true));
        console.log(userDetails.firstName); // Access firstName from userDetails
        dispatch(Reduxusername(userDetails.firstName)); // Dispatch using the actual property name
        navigate('/home');
      } else {
        dispatch(setLogin(false));
        throw new Error(message); // Use the message from the array
      }
    })
    .catch(error => {
      console.error('There has been a problem with your login operation:', error);
      alert(error.message);
    });    

  };
   console.log("login",islogin);
  

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you can handle the registration logic
    navigate('/register');
  };

  return (
    <div className={styles.fullPageBackground} style={{backdrop:'url(${backdrop})'}}>
      <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.loginButton}`} onClick={handleLogin}>Login</button>
            <button className={`${styles.button} ${styles.registerButton}`} onClick={handleRegister}>Register</button>
        </div>  
      </form>
      </div>    
    </div>
  );
}

export { Login };
