import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import 'antd/dist/reset.css';
import { useTheme } from './ThemeContext';

const { Link } = Typography;

const Register = ({ onSwitchToLogin }) => {
  const { colors } = useTheme();
  const onFinish = (values) => {
    console.log('Success:', values);
    // Kayıt işlemleri burada yapılabilir
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: colors.background }}>
      <Card title={<div style={{textAlign: 'center', width: '100%', color: colors.text}}>Kayıt Ol</div>} style={{ width: 400, backgroundColor: colors.surface, borderColor: colors.border }}>
        <Form
          name="register"
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
            label="E-posta"
            name="email"
            rules={[
              { required: true, message: 'Lütfen e-posta adresinizi girin!' },
              { type: 'email', message: 'Geçerli bir e-posta girin!' }
            ]}
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

          <Form.Item
            label="Şifre Tekrar"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: 'Lütfen şifrenizi tekrar girin!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                },
              }),
            ]}
          >
            <Input.Password style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox style={{ color: colors.text }}>Kullanım koşullarını kabul ediyorum</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link onClick={onSwitchToLogin} style={{ color: colors.primary }}>Zaten hesabınız var mı? Giriş yapın</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
