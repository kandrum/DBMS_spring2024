import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 // Update the path if needed

function Rental() {
  
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [isLogin, navigate]);
  console.log("rental-login",isLogin);

  return (
    <div>
        <h1>
            This is Rental insurence
        </h1>
    </div>
  );
}

export { Rental };
