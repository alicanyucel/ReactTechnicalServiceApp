import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Typography,
  message,
  Popconfirm
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useTheme } from './ThemeContext';

const { Title } = Typography;
const { Option } = Select;

// CustomerType enum'u
const CustomerType = {
  Individual: 'Individual',
  Corporate: 'Corporate'
};

const CustomerCRUD = () => {
  const { colors, currentTheme, isDarkMode, isYellowRedMode } = useTheme();
  const [customers, setCustomers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const mockCustomers = [
      {
        id: 1,
        name: 'Ahmet',
        surname: 'Yılmaz',
        phoneNumber: '0555 123 45 67',
        email: 'ahmet.yilmaz@email.com',
        address: 'Atatürk Caddesi No:123',
        city: 'İstanbul',
        country: 'Türkiye',
        zipCode: '34000',
        district: 'Kadıköy',
        province: 'İstanbul',
        neighborhood: 'Caferağa',
        customerType: CustomerType.Individual
      },
      {
        id: 2,
        name: 'ABC',
        surname: 'Şirketi',
        phoneNumber: '0216 555 00 00',
        email: 'info@abc.com',
        address: 'İş Merkezi Sokak No:45',
        city: 'İstanbul',
        country: 'Türkiye',
        zipCode: '34000',
        district: 'Şişli',
        province: 'İstanbul',
        neighborhood: 'Mecidiyeköy',
        customerType: CustomerType.Corporate
      }
    ];
    setCustomers(mockCustomers);
  }, []);

  const showModal = (customer = null) => {
    setEditingCustomer(customer);
    setIsModalVisible(true);

    if (customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCustomer(null);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (editingCustomer) {
      // Güncelleme
      setCustomers(customers.map(cust =>
        cust.id === editingCustomer.id
          ? { ...cust, ...values }
          : cust
      ));
      message.success('Müşteri başarıyla güncellendi!');
    } else {
      // Yeni ekleme
      const newCustomer = {
        ...values,
        id: Math.max(...customers.map(c => c.id), 0) + 1
      };
      setCustomers([...customers, newCustomer]);
      message.success('Müşteri başarıyla eklendi!');
    }

    setIsModalVisible(false);
    setEditingCustomer(null);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(cust => cust.id !== id));
    message.success('Müşteri başarıyla silindi!');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Soyad',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Telefon',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'E-posta',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Şehir',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Müşteri Tipi',
      dataIndex: 'customerType',
      key: 'customerType',
      render: (type) => (
        <span style={{
          color: type === CustomerType.Individual ? '#1890ff' : '#52c41a',
          fontWeight: 'bold'
        }}>
          {type === CustomerType.Individual ? 'Bireysel' : 'Kurumsal'}
        </span>
      ),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            size="small"
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Bu müşteriyi silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              size="small"
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: colors.background, color: colors.text }}>
      <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 16, gap: 16 }}>
          <Title level={2} style={{ margin: 0, color: colors.text }}>Müşteri Yönetimi</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            size="large"
            style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
          >
            Yeni Müşteri Ekle
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={customers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${total} müşteri arasından ${range[0]}-${range[1]} arası gösteriliyor`,
            position: ['bottomCenter'],
          }}
          scroll={{ x: 1200 }}
        />

        <Modal
          title={<span style={{ color: colors.text }}>{editingCustomer ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"}</span>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
          bodyStyle={{ backgroundColor: colors.surface }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              customerType: CustomerType.Individual
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                name="name"
                label="Ad"
                rules={[{ required: true, message: 'Lütfen ad girin!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="surname"
                label="Soyad"
                rules={[{ required: true, message: 'Lütfen soyad girin!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Telefon"
                rules={[{ required: true, message: 'Lütfen telefon numarası girin!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-posta"
                rules={[
                  { required: true, message: 'Lütfen e-posta girin!' },
                  { type: 'email', message: 'Geçerli bir e-posta adresi girin!' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="customerType"
                label="Müşteri Tipi"
                rules={[{ required: true, message: 'Lütfen müşteri tipi seçin!' }]}
              >
                <Select>
                  <Option value={CustomerType.Individual}>Bireysel</Option>
                  <Option value={CustomerType.Corporate}>Kurumsal</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                label="Şehir"
                rules={[{ required: true, message: 'Lütfen şehir girin!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="district"
                label="İlçe"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="province"
                label="İl"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="neighborhood"
                label="Mahalle"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="zipCode"
                label="Posta Kodu"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="country"
                label="Ülke"
                rules={[{ required: true, message: 'Lütfen ülke girin!' }]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="address"
              label="Adres"
              rules={[{ required: true, message: 'Lütfen adres girin!' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
              <Space>
                <Button onClick={handleCancel}>
                  İptal
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingCustomer ? 'Güncelle' : 'Ekle'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default CustomerCRUD;