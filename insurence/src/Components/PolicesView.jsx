import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/PolicesView.module.css'; 

import autoIcon from '../assets/auto-icon.png'; // Update the path if needed
import rentalIcon from '../assets/rental.png'; // Update the path if needed
import healthIcon from '../assets/health-icon.png';

function PolicesView() {
  
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); // Make sure this route leads to your login component
    }
  }, [isLogin, navigate]);
  console.log('policeview',isLogin);

  const handleAuto = (e) => {
    e.preventDefault();
    navigate('/auto');
  };

  const handleRental = (e) => {
    e.preventDefault();
    navigate('/rental');
  };

  const handleHealth = (e) => {
    e.preventDefault();
    navigate('/health');
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <nav className={styles.navbar}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/mypolicies" className={styles.navLink}>My Policies</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/policesview" className={styles.navLink}>Policies</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={styles.buttonContainer}>
        <div className={styles.cardButton} onClick={handleAuto}>
          <img src={autoIcon} alt="Auto" />
          <div className={styles.buttonText}>
            <span className={styles.buttonMain}>Auto</span>
            <span className={styles.buttonSub}>Auto insurance policies</span>
          </div>
        </div>
        <div className={styles.cardButton} onClick={handleRental}>
          <img src={rentalIcon} alt="Rental" />
          <div className={styles.buttonText}>
            <span className={styles.buttonMain}>Rental</span>
            <span className={styles.buttonSub}>Rental insurance policies</span>
          </div>
        </div>
        <div className={styles.cardButton} onClick={handleHealth}>
          <img src={healthIcon} alt="Health" />
          <div className={styles.buttonText}>
            <span className={styles.buttonMain}>Health</span>
            <span className={styles.buttonSub}>Health insurance policies</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PolicesView };       