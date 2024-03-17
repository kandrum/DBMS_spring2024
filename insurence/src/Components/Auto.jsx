import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 // Update the path if needed

function Auto() {
  
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [isLogin, navigate]);
  console.log("auto-login",isLogin);

  return (
    <div>
        <h1>
            This is Auto insurence
        </h1>
    </div>
  );
}

export { Auto };
