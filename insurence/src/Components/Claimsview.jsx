import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/*import styles from '../styles/Home.module.css'; // Update the path if needed


import backgroundGif from '../assets/cloud.gif';
import claimsIcon from '../assets/claims-icon.png'; // Update the path if needed
import policiesIcon from '../assets/policies-icon.png'; // Update the path if needed*/

function Claimsview() {
  
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [isLogin, navigate]);
  console.log("claim-login",isLogin);

  return (
    <div>
        <h1>This is Claims page</h1>
    </div>
  );
}

export { Claimsview };
