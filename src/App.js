
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import CustomerCRUD from './CustomerCRUD';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // HIZLI TEST İÇİN: Bu satırları aktifleştirip login ekranını bypass edebilirsiniz
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [currentScreen, setCurrentScreen] = useState('dashboard');

  const switchToRegister = () => {
    setCurrentScreen('register');
  };

  const switchToLogin = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (values) => {
    // Basit login kontrolü - gerçek uygulamada API çağrısı yapılacak
    console.log('Login:', values);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  if (isLoggedIn && currentScreen === 'dashboard') {
    return (
      <div className="App">
        <div style={{ padding: 16, background: '#001529', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Teknik Servis Yönetim Sistemi</h2>
          <button
            onClick={handleLogout}
            style={{
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Çıkış Yap
          </button>
        </div>
        <CustomerCRUD />

        {/* Footer - Tüm sayfalarda görünür */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: 16,
          backgroundColor: '#87CEEB',
          color: '#000000',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
        }}>
          © 2025 Mudbey Yazılım - Tüm Hakları Saklıdır
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {currentScreen === 'login' ? (
        <Login onSwitchToRegister={switchToRegister} onLogin={handleLogin} />
      ) : (
        <Register onSwitchToLogin={switchToLogin} />
      )}

      {/* Footer - Tüm sayfalarda görünür */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: 16,
        backgroundColor: '#87CEEB',
        color: '#000000',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
      }}>
        © 2025 Mudbey Yazılım - Tüm Hakları Saklıdır
      </div>
    </div>
  );
}

export default App;
