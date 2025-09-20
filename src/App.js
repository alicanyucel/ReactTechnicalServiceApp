
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import CustomerCRUD from './CustomerCRUD';
import { ThemeProvider, useTheme } from './ThemeContext';
import { SunOutlined, MoonOutlined, FireOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Space, ConfigProvider, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import trTR from 'antd/locale/tr_TR';
import enUS from 'antd/locale/en_US';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { currentTheme, toggleTheme, colors } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // show notifications at top-right (toastr sağ üstte) and shorten display to 2s
    notification.config({ placement: 'topRight', duration: 2 });
  }, []);

  const getAntdLocale = () => {
    return i18n.language === 'tr' ? trTR : enUS;
  };

  const switchToRegister = () => {
    setCurrentScreen('register');
  };

  const switchToLogin = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (loginData) => {
    // loginData is the server response (may contain user/token)
    console.log('Login data:', loginData);
    const u = loginData?.user || loginData || null;
    setUser(u);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setUser(null);
    try {
      // clear client-side auth
      // eslint-disable-next-line global-require
      const { deleteCookie } = require('./utils/cookieUtils');
      deleteCookie('auth_token');
      deleteCookie('auth_user');
      deleteCookie('auth_raw');
    } catch (e) {
      localStorage.removeItem('auth');
    }
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ margin: 0, color: colors.text }}>{t('app.title')}</h2>
            {user && (
              <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>
                {t('auth.welcome', { name: user?.name || user?.fullName || user?.userName || user?.displayName || user?.email || '' })}
              </div>
            )}
          </div>
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

        {/* Footer - Tüm sayfalarda görünür (themed, high-contrast) */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: 0,
          backgroundColor: colors.surface,
          color: colors.text,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: '600',
          borderTop: `1px solid ${colors.border}`
        }}>
          <div style={{ height: 6, background: colors.primary, width: '100%' }} />
          <div style={{ padding: '10px 16px' }}>
            <div className="app-footer-title" style={{ marginBottom: 4, color: colors.text }}>
              {t('footer.copyright')} | {t('footer.developedBy')}
            </div>
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

        {/* Footer - Tüm sayfalarda görünür (themed, high-contrast) */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: 0,
          backgroundColor: colors.surface,
          color: colors.text,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: '600',
          borderTop: `1px solid ${colors.border}`
        }}>
          <div style={{ height: 6, background: colors.primary, width: '100%' }} />
          <div style={{ padding: '10px 16px' }}>
            <div className="app-footer-title" style={{ marginBottom: 4, color: colors.text }}>
              {t('footer.copyright')} | {t('footer.developedBy')}
            </div>
            <div className="app-footer-subtitle" style={{ color: colors.textSecondary }}>
              {t('footer.description')} - {t('footer.version')}
            </div>
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
