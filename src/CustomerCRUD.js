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
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');
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
    setFiltered(mockCustomers);
  }, []);

  useEffect(() => {
    if (!searchText) {
      setFiltered(customers);
      return;
    }
    const q = searchText.toLowerCase();
    setFiltered(customers.filter(c => (
      (c.name || '').toLowerCase().includes(q) ||
      (c.surname || '').toLowerCase().includes(q) ||
      (c.phoneNumber || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q)
    )));
  }, [searchText, customers]);

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
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('customer.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('customer.surname'),
      dataIndex: 'surname',
      key: 'surname',
      sorter: (a, b) => (a.surname || '').localeCompare(b.surname || ''),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('customer.phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => (a.phoneNumber || '').localeCompare(b.phoneNumber || ''),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('customer.email'),
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('customer.city'),
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => (a.city || '').localeCompare(b.city || ''),
      sortDirections: ['ascend', 'descend'],
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
      sorter: (a, b) => ((a.customerType || '').localeCompare(b.customerType || '')),
      sortDirections: ['ascend', 'descend'],
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
            okText={t('customer.delete')}
            cancelText={t('customer.cancel')}
            okType="danger"
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 16 }}>
          <Title level={2} style={{ margin: 0, color: colors.text, flex: '0 0 auto' }}>{t('customer.management')}</Title>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 260 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
              size="large"
              style={{ backgroundColor: colors.primary, borderColor: colors.primary, flex: '0 0 auto' }}
            >
              {t('customer.addNew')}
            </Button>

            <Input.Search
              placeholder={t('customerSearch.placeholder')}
              allowClear
              enterButton
              onSearch={setSearchText}
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
              style={{ flex: 1, minWidth: 0 }}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filtered}
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
          bodyStyle={{ backgroundColor: colors.surface, color: colors.text }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              customerType: CustomerType.Individual
            }}
          >
            {/* input style to match theme */}
            {/* eslint-disable-next-line */}
            <div style={{ display: 'none' }} />
            {/* apply themed styles to inputs and labels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Form.Item
                name="name"
                label={<span style={{ color: colors.text }}>{t('customer.name')}</span>}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="surname"
                label={<span style={{ color: colors.text }}>{t('customer.surname')}</span>}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={<span style={{ color: colors.text }}>{t('customer.phone')}</span>}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span style={{ color: colors.text }}>{t('customer.email')}</span>}
                rules={[
                  { required: true, message: t('validation.required') },
                  { type: 'email', message: t('validation.email') }
                ]}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="customerType"
                label={<span style={{ color: colors.text }}>{t('customer.type')}</span>}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Select style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} dropdownStyle={{ backgroundColor: colors.surface, color: colors.text }}>
                  <Option value={CustomerType.Individual}>{t('customer.individual')}</Option>
                  <Option value={CustomerType.Corporate}>{t('customer.corporate')}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                label={<span style={{ color: colors.text }}>{t('customer.city')}</span>}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="district"
                label={<span style={{ color: colors.text }}>{t('customer.district')}</span>}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="province"
                label={<span style={{ color: colors.text }}>{t('customer.province')}</span>}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="neighborhood"
                label={<span style={{ color: colors.text }}>{t('customer.neighborhood')}</span>}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="zipCode"
                label={<span style={{ color: colors.text }}>{t('customer.zipCode')}</span>}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>

              <Form.Item
                name="country"
                label={<span style={{ color: colors.text }}>{t('customer.country')}</span>}
                rules={[{ required: true, message: t('validation.required') }]}
              >
                <Input style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
              </Form.Item>
            </div>

            <Form.Item
              name="address"
              label={<span style={{ color: colors.text }}>{t('customer.address')}</span>}
              rules={[{ required: true, message: t('validation.required') }]}
            >
              <Input.TextArea rows={3} style={{ backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }} />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
              <Space>
                <Button onClick={handleCancel}>
                  {t('customer.cancel')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingCustomer ? t('customer.delete') : t('customer.delete')}
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