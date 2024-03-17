import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from './Components/Login'
import {Register} from './Components/Register'
import {Home} from './Components/Home'
import { PolicesView } from "./Components/PolicesView";
import { Claimsview } from "./Components/Claimsview";
import { Mypolicies } from "./Components/Mypolicies";
import { Auto } from "./Components/Auto";
import { Rental } from "./Components/Rental";
import Health from "./Components/health";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/policesview" element={<PolicesView />}></Route>
        <Route path="/claimsview" element={<Claimsview />}></Route>
        <Route path="/mypolicies" element={<Mypolicies />}></Route>
        <Route path="/auto" element={<Auto />}></Route>
        <Route path="/rental" element={<Rental />}></Route>
        <Route path="/health" element={<Health />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
