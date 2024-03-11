import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from './Components/Login'
import {Register} from './Components/Register'
import {Home} from './Components/Home'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
