import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginC from './components/LoginC';
import LoginL from './components/LoginL';
import CitizenSignup from './components/CitizenSignup';
import LeaderSignup from './components/LeaderSignup.jsx';
import CitizenHomepage from './components/CitizenHomepage.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/loginC" element={<LoginC setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/loginL" element={<LoginL setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/citizenSignup" element={<CitizenSignup />} />
        <Route path="/leaderSignup" element={<LeaderSignup />} />
        <Route path="/homeC" element={<CitizenHomepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;