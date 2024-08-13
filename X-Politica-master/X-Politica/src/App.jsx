import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginC from './components/LoginC';
import LoginL from './components/LoginL';
import CitizenSignup from './components/CitizenSignup';
import LeaderSignup from './components/LeaderSignup.jsx';
import CitizenHomepage from './components/CitizenHomepage.jsx';
import AdminSignup from './components/AdminSignup.jsx';
import AdminLogin from './components/AdminLogin.jsx'
import AdminHomepage from './components/AdminHomepage.jsx';
import ElectionDeclarepage from './components/ElectionDeclare.jsx';
import PartySignUp from './components/PartyRegister.jsx';
import LeaderHomepage from './components/LeaderHomepage.jsx';
import ElectionRegister from './components/ElectionRegister.jsx';
import CitizenVote from './components/CitizenVote.jsx';
import  DeclareWinnerPage from './components/DeclareWinner.jsx';

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
        <Route path="/adminSignup" element={<AdminSignup/>} />
        <Route path="/partyRegister" element={<PartySignUp />} />
        <Route path="/register" element={<ElectionRegister />} />
        <Route path="/citizenVote" element={<CitizenVote/>} />
        <Route path="/winner" element={<DeclareWinnerPage/>}/>
        <Route path="/adminL" element={<AdminLogin setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/homeC" element={<CitizenHomepage />} />
        <Route path="/homeA" element={<AdminHomepage />} />
        <Route path="/homeL" element={<LeaderHomepage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/electionDeclare" element={<ElectionDeclarepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;