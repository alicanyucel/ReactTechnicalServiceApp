
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import CustomerCRUD from './CustomerCRUD';
import { ThemeProvider, useTheme } from './ThemeContext';
import { SunOutlined, MoonOutlined, FireOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Space, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import trTR from 'antd/locale/tr_TR';
import enUS from 'antd/locale/en_US';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentTheme, toggleTheme, colors } = useTheme();
  const { t, i18n } = useTranslation();

  const getAntdLocale = () => {
    return i18n.language === 'tr' ? trTR : enUS;
  };

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
        return t('theme.dark');
      case 'yellow-red':
        return t('theme.yellowRed');
      default:
        return t('theme.light');
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
  };

  const getLanguageText = () => {
    return i18n.language === 'tr' ? 'EN' : 'TR';
  };

  if (isLoggedIn && currentScreen === 'dashboard') {
    return (
      <ConfigProvider locale={getAntdLocale()}>
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
          <h2 style={{ margin: 0, color: colors.text }}>{t('app.title')}</h2>
          <Space>
            <Button
              type="text"
              icon={<GlobalOutlined />}
              onClick={toggleLanguage}
              style={{ color: colors.text }}
              title={t('language.switchLanguage')}
            >
              {getLanguageText()}
            </Button>
            <Button
              type="text"
              icon={getThemeIcon()}
              onClick={toggleTheme}
              style={{ color: colors.text }}
              title={t('theme.switchTheme')}
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
              {t('app.logout')}
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
          padding: '12px 16px',
          backgroundColor: colors.primary,
          color: colors.text,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 'bold',
          boxShadow: currentTheme === 'dark' ? '0 -2px 8px rgba(255,255,255,0.1)' : '0 -2px 8px rgba(0,0,0,0.1)',
          borderTop: `1px solid ${colors.border}`
        }}>
          <div style={{ marginBottom: 4 }}>
            {t('footer.copyright')} | {t('footer.developedBy')}
          </div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>
            {t('footer.description')} - {t('footer.version')}
          </div>
        </div>
      </div>
    </ConfigProvider>
    );
  }

  return (
    <ConfigProvider locale={getAntdLocale()}>
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
          padding: '12px 16px',
          backgroundColor: colors.primary,
          color: colors.text,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 'bold',
          boxShadow: currentTheme === 'dark' ? '0 -2px 8px rgba(255,255,255,0.1)' : '0 -2px 8px rgba(0,0,0,0.1)',
          borderTop: `1px solid ${colors.border}`
        }}>
          <div style={{ marginBottom: 4 }}>
            {t('footer.copyright')} | {t('footer.developedBy')}
          </div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>
            {t('footer.description')} - {t('footer.version')}
          </div>
        </div>
      </div>
    </ConfigProvider>
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
