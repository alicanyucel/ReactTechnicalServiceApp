
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const switchToRegister = () => {
    setCurrentScreen('register');
  };

  const switchToLogin = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="App">
      {currentScreen === 'login' ? (
        <Login onSwitchToRegister={switchToRegister} />
      ) : (
        <Register onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
}

export default App;
