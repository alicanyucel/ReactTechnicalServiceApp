import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import 'antd/dist/reset.css';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    // Giriş işlemleri burada yapılabilir
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <Card title={<div style={{textAlign: 'center', width: '100%'}}>Giriş Yap</div>} style={{ width: 400 }}>
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
