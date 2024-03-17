import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css'; // Update the path if needed


import backgroundGif from '../assets/cloud.gif';
import claimsIcon from '../assets/claims-icon.png'; // Update the path if needed
import policiesIcon from '../assets/policies-icon.png'; // Update the path if needed

function Home() {
  
  const isLogin = useSelector((state) => state.login.isLogin);
  const userName = useSelector((state) => state.username.userName);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [isLogin, navigate]);
  console.log("home-login",isLogin);

  const handlepolices = (e) =>{
    e.preventDefault();
    navigate('/policesview');
  }
  const handleclaims = (e) =>{
    e.preventDefault();
    navigate('/claimsview');
  }

  return (
    <div className={styles.home} style={{ backgroundImage: `url(${backgroundGif})` }}>
      <h1 className={styles.header}>Welcome, {userName}!</h1>
      <div className={styles.buttonContainer}>
        <div className={styles.cardButton}>
          <img src={claimsIcon} alt="Claims" />
          <div className={styles.buttonText}>
            <span className={styles.buttonMain} onClick={handleclaims}>Claims</span>
            <span className={styles.buttonSub}>Report and manage claims</span>
          </div>
        </div>
        <div className={styles.cardButton}>
          <img src={policiesIcon} alt="Policies" />
          <div className={styles.buttonText}>
            <span className={styles.buttonMain} onClick={handlepolices}>Policies</span>
            <span className={styles.buttonSub}>View your policy details</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Home };
