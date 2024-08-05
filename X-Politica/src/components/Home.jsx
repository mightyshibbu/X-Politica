import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginC from './LoginC'; // Import Login as Citizen component
import LoginL from './LoginL'; // Import Login as Leader component

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(null); // Track which login component to show

  const onLoginAsCitizen = () => {
    navigate('/loginC', { replace: true });
  };

  const onLoginAsLeader = () => {
    navigate('loginL', { replace: true });
  };

  const onSignUpAsCitizen = () => {
    navigate('citizenSignup', { replace: true });
  };

  const onSignUpAsLeader = () => {
    navigate('leaderSignup', { replace: true });
  };
  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>X-Politica</div>
      </div>
      <div>A political overview and claim validation platform!</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginAsCitizen}
          value={loggedIn ? 'Log out' : 'Log in as Citizen'}
        />
        <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onSignUpAsCitizen}>
          Not registered? Quick sign up as Citizen
        </div>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginAsLeader}
          value={loggedIn ? 'Log out' : 'Log in as Leader'}
        />
        <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onSignUpAsLeader}>
          Not registered? Quick sign up as Leader
        </div>
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;