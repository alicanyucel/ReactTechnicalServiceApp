import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, notification } from 'antd';
import 'antd/dist/reset.css';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import { setJsonCookie } from './utils/cookieUtils';

const { Link } = Typography;

const Login = ({ onSwitchToRegister, onLogin }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const notify = (type, msg, desc) => notification[type]({ message: msg, description: desc, placement: 'topRight' });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = { emailOrUserName: values.username, password: values.password };
      const urlHttps = 'https://localhost:7054/api/Auth/Login';
      const urlHttp = 'http://localhost:7054/api/Auth/Login';
      let res;

      // First try HTTPS
      try {
        res = await fetch(urlHttps, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } catch (errHttps) {
        console.warn('HTTPS request failed:', errHttps && errHttps.message ? errHttps.message : errHttps);
        // fallback to HTTP (useful in local dev when HTTPS cert blocks request)
        try {
          notify('info', 'HTTPS failed, trying HTTP', errHttps && errHttps.message ? errHttps.message : '');
          res = await fetch(urlHttp, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        } catch (errHttp) {
          console.error('Both HTTPS and HTTP requests failed', errHttps, errHttp);
          notify('error', t('auth.loginFailed') || 'Login failed', `Network error: ${errHttp && errHttp.message ? errHttp.message : errHttp}`);
          setLoading(false);
          return;
        }
      }

      if (!res.ok) {
        let bodyText = await res.text();
        // try to pretty-print JSON errors
        try { const parsed = JSON.parse(bodyText); bodyText = JSON.stringify(parsed, null, 2); } catch (e) { /* not json */ }
        notify('error', `${t('auth.loginFailed') || 'Login failed'} (${res.status})`, bodyText || res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      // expected to contain token and user info
      const token = data?.token || data?.accessToken || data?.tokenValue || data?.access_token || (typeof data === 'string' ? data : null);
      const user = data?.user || (data?.userInfo ? data.userInfo : (typeof data === 'object' ? data : null));

      try {
        if (token) setJsonCookie('auth_token', token, values.remember ? 30 : 1);
        if (user) setJsonCookie('auth_user', user, values.remember ? 30 : 1);
        if (!token && !user) setJsonCookie('auth_raw', data, values.remember ? 30 : 1);
      } catch (e) {
        console.warn('Unable to set cookies', e);
        localStorage.setItem('auth', JSON.stringify(data));
      }

  // welcome message using common name fields returned by backend
      const displayName = user?.name || user?.fullName || user?.userName || user?.displayName || user?.email || values.username;
      // i18n interpolated single top-right welcome toast
      notification.success({
        message: t('auth.welcome', { name: displayName }),
        description: t('auth.loginSuccess') || '',
        placement: 'topRight',
        duration: 2
      });
  // Ensure we pass a user object to the app. If backend didn't return a user, fall back to displayName
  const payloadForApp = { token, user: user || { displayName } , raw: data };
  if (onLogin) onLogin(payloadForApp);
    } catch (err) {
      notify('error', t('auth.loginFailed') || 'Login failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: colors.background }}>
  <Card title={<div style={{textAlign: 'center', width: '100%', color: colors.text}}>{t('app.login')}</div>} style={{ width: 400, backgroundColor: colors.surface, borderColor: colors.border }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label={t('app.username')}
            name="username"
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
          </Form.Item>

          <Form.Item
            label={t('app.password')}
            name="password"
            rules={[{ required: true, message: t('validation.required') }]}
          >
            <Input.Password style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox style={{ color: colors.text }}>{t('app.rememberMe')}</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
              {t('app.loginButton')}
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link onClick={onSwitchToRegister} style={{ color: colors.primary }}>{t('app.noAccount')} {t('app.register')}</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
