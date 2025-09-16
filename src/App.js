
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import CustomerCRUD from './CustomerCRUD';
import { ThemeProvider, useTheme } from './ThemeContext';
import { SunOutlined, MoonOutlined, FireOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentTheme, toggleTheme, colors } = useTheme();

  const switchToRegister = () => {
    setCurrentScreen('register');
  };

  const switchToLogin = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (values) => {
    console.log('Login:', values);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'dark':
        return <MoonOutlined />;
      case 'yellow-red':
        return <FireOutlined />;
      default:
        return <SunOutlined />;
    }
  };

  const getThemeText = () => {
    switch (currentTheme) {
      case 'dark':
        return 'Koyu Tema';
      case 'yellow-red':
        return 'Sarı-Kırmızı Tema';
      default:
        return 'Açık Tema';
    }
  };

  if (isLoggedIn && currentScreen === 'dashboard') {
    return (
      <div className="App" style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh' }}>
        <div style={{
          padding: 16,
          background: colors.surface,
          color: colors.text,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${colors.border}`
        }}>
          <h2 style={{ margin: 0, color: colors.text }}>Teknik Servis Yönetimi</h2>
          <Space>
            <Button
              type="text"
              icon={getThemeIcon()}
              onClick={toggleTheme}
              style={{
                color: colors.text,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.surface
              }}
            >
              {getThemeText()}
            </Button>
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
          </Space>
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
          backgroundColor: colors.primary,
          color: colors.text,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          boxShadow: isDarkMode ? '0 -2px 8px rgba(255,255,255,0.1)' : '0 -2px 8px rgba(0,0,0,0.1)',
          borderTop: `1px solid ${colors.border}`
        }}>
          © 2025 Mudbey Yazılım - Tüm Hakları Saklıdır
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh' }}>
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
        backgroundColor: colors.primary,
        color: colors.text,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        boxShadow: isDarkMode ? '0 -2px 8px rgba(255,255,255,0.1)' : '0 -2px 8px rgba(0,0,0,0.1)',
        borderTop: `1px solid ${colors.border}`
      }}>
        © 2025 Mudbey Yazılım - Tüm Hakları Saklıdır
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
