import React, { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { setLogin } from '../redux/LoginReducer';
import backdrop from './image1.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const islogin = useSelector((state) => state.login.isLogin); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (islogin) {
      console.log('login',islogin);
      navigate('/home');
    }
  }, [islogin, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "Admin123") {
      dispatch(setLogin(true)); 
    } else {
      alert('Your username or password is wrong');
      dispatch(setLogin(false));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you can handle the registration logic
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
