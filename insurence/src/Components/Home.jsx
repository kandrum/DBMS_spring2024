import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Home() {
  
  const isLogin = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();
  console.log("home", isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate('/'); 
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}

export {Home};
