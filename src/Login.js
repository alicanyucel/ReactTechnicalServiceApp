import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import 'antd/dist/reset.css';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';

const { Link } = Typography;

const Login = ({ onSwitchToRegister, onLogin }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const onFinish = (values) => {
    console.log('Success:', values);
    // Giriş işlemleri burada yapılabilir
    if (onLogin) {
      onLogin(values);
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
            <Button type="primary" htmlType="submit" style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
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
