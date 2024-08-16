import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import LoginC from './components/LoginC';
import LoginL from './components/LoginL';
import CitizenSignup from './components/CitizenSignup';
import LeaderSignup from './components/LeaderSignup.jsx';
import CitizenHomepage from './components/CitizenHomepage.jsx';
import ClaimValidation from './components/ClaimValidation.jsx';
import LeaderHomepage from './components/LeaderHomepage.jsx';
import NewClaim from './components/NewClaim.jsx';
import ViewClaims from './components/ViewClaims'
import MyClaims from './components/MyClaims.jsx';
import ViewClaimsLeader from './components/ViewClaimsLeader.jsx';
import ElectionDeclarepage from './components/ElectionDeclare.jsx';
import AdminHomepage from './components/AdminHomepage.jsx';
import LeaderElectionRegister from './components/LeaderElectionRegister.jsx';
import CitizenVote from './components/CitizenVote.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import DeclareWinnerPage from './components/DeclareWinner..jsx';
import MyProfile from './components/MyProfile.jsx';
import MyLeaderProfile from './components/MyLeaderProfile.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={<Landing email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/loginC" element={<LoginC setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/loginL" element={<LoginL setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/adminL" element={<AdminLogin setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/citizenSignup" element={<CitizenSignup />} />
        <Route path="/leaderSignup" element={<LeaderSignup />} />
        <Route path="/homeC" element={<CitizenHomepage />} />
        <Route path="/homeL" element={<LeaderHomepage />} />
        <Route path="/homeA" element={<AdminHomepage />} />
        <Route path="/electionDeclare" element={<ElectionDeclarepage />} />
        <Route path="/register" element={<LeaderElectionRegister />} />
        <Route path="/citizenVote" element={<CitizenVote/>} />
        <Route path="/winner" element={<DeclareWinnerPage/>}/>
        <Route path="/viewclaims" element={<ClaimValidation/>} />
        <Route path="/viewclaimsleader" element={<ViewClaimsLeader/>} />
        <Route path="/claim" element={< ViewClaims/>} />
        <Route path="/newclaim" element={<NewClaim />} />
        <Route path="/citizenprofile" element={<MyProfile />} />
        <Route path="/leaderprofile" element={<MyLeaderProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;