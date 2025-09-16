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
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

// CustomerType enum'u
const CustomerType = {
  Individual: 'Individual',
  Corporate: 'Corporate'
};

const CustomerCRUD = () => {
  const { colors, currentTheme } = useTheme();
  const { t } = useTranslation();
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
      message.success(t('customer.updateSuccess'));
    } else {
      // Yeni ekleme
      const newCustomer = {
        ...values,
        id: Math.max(...customers.map(c => c.id), 0) + 1
      };
      setCustomers([...customers, newCustomer]);
      message.success(t('customer.saveSuccess'));
    }

    setIsModalVisible(false);
    setEditingCustomer(null);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(cust => cust.id !== id));
    message.success(t('customer.deleteSuccess'));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: t('customer.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('customer.surname'),
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: t('customer.phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: t('customer.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('customer.city'),
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: t('customer.type'),
      dataIndex: 'customerType',
      key: 'customerType',
      render: (type) => (
        <span style={{
          color: type === CustomerType.Individual ? '#1890ff' : '#52c41a',
          fontWeight: 'bold'
        }}>
          {type === CustomerType.Individual ? t('customer.individual') : t('customer.corporate')}
        </span>
      ),
    },
    {
      title: t('customer.edit'),
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            size="small"
          >
            {t('customer.edit')}
          </Button>
          <Popconfirm
            title={t('customer.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('customer.save')}
            cancelText={t('customer.cancel')}
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              size="small"
            >
              {t('customer.delete')}
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
          <Title level={2} style={{ margin: 0, color: colors.text }}>{t('customer.management')}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            size="large"
            style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
          >
            {t('customer.addNew')}
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
              t('pagination.showTotal', { total, start: range[0], end: range[1] }),
            position: ['bottomCenter'],
          }}
          scroll={{ x: 1200 }}
        />

        <Modal
          title={<span style={{ color: colors.text }}>{editingCustomer ? t('customer.edit') : t('customer.addNew')}</span>}
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
                label={t('customer.name')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="surname"
                label={t('customer.surname')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={t('customer.phone')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label={t('customer.email')}
                rules={[
                  { required: true, message: t('validation.required') },
                  { type: 'email', message: t('validation.email') }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="customerType"
                label={t('customer.type')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Select>
                  <Option value={CustomerType.Individual}>{t('customer.individual')}</Option>
                  <Option value={CustomerType.Corporate}>{t('customer.corporate')}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                label={t('customer.city')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="district"
                label={t('customer.district')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="province"
                label={t('customer.province')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="neighborhood"
                label={t('customer.neighborhood')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="zipCode"
                label={t('customer.zipCode')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="country"
                label={t('customer.country')}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input />
              </Form.Item>
            </div>

            <Form.Item
              name="address"
              label={t('customer.address')}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
              <Space>
                <Button onClick={handleCancel}>
                  {t('customer.cancel')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingCustomer ? t('customer.save') : t('customer.save')}
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