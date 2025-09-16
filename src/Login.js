import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import 'antd/dist/reset.css';
import { useTheme } from './ThemeContext';

const { Link } = Typography;

const Login = ({ onSwitchToRegister, onLogin }) => {
  const { colors } = useTheme();
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
  <Card title={<div style={{textAlign: 'center', width: '100%', color: colors.text}}>Giriş Yap</div>} style={{ width: 400, backgroundColor: colors.surface, borderColor: colors.border }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
          >
            <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox style={{ color: colors.text }}>Beni Hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link onClick={onSwitchToRegister} style={{ color: colors.primary }}>Hesabınız yok mu? Kayıt olun</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
