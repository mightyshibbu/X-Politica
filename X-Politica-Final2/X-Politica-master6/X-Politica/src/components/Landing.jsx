import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Landing.css'; // Import the CSS file

const Landing = (props) => {
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

  const onLoginAsAdmin = () => {
    navigate('/adminL', { replace: true });
  };

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>X-Politica</div>
      </div>
      <div className="tagline">A political overview and claim validation platform!</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginAsCitizen}
          value={loggedIn ? 'Log out' : 'Log in as Citizen'}
        />
        <div  className="QuickSignup" onClick={onSignUpAsCitizen}>
          Not registered? Quick sign up as Citizen
        </div>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginAsLeader}
          value={loggedIn ? 'Log out' : 'Log in as Leader'}
        />
        <div className="QuickSignup" onClick={onSignUpAsLeader}>
          Not registered? Quick sign up as Leader
        </div>
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
        <input
          className={'admininputButton'}
          type="button"
          onClick={onLoginAsAdmin}
          value={loggedIn ? 'Log out' : 'Log in as Admin'}
        />
      </div>
    </div>
  );
};

export default Landing;