
# Teknik Servis React Projesi

Bu proje, teknik servis yönetimi için modern bir web uygulamasıdır. Kullanıcı dostu arayüzü ve güçlü altyapısı ile servis taleplerinin, müşteri bilgilerinin ve işlemlerin kolayca yönetilmesini sağlar.

## Özellikler
- **Kullanıcı Girişi:** Ant Design ile şık ve güvenli login ekranı
- **Müşteri ve Servis Takibi:** Müşteri, cihaz ve servis kayıtlarını kolayca yönetme (geliştirilebilir)
- **Responsive Tasarım:** Tüm cihazlarda uyumlu ve modern arayüz
- **Kolay Kurulum:** Docker ve docker-compose ile hızlı başlatma

## Kurulum

### 1. Klasik Yöntem (Node.js ile)
```bash
npm install
npm start
```

### 2. Docker ile
```bash
docker build -t teknikservis-app .
docker run -p 3000:80 teknikservis-app
```

### 3. Docker Compose ile
```bash
docker-compose up --build
```

## Kullanılan Teknolojiler
- React
- Ant Design
- Docker & Nginx

## Proje Yapısı
```
my-react-app/
├── src/
│   ├── App.js
│   ├── Login.js
│   └── ...
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Katkı ve Geliştirme
Projeye katkıda bulunmak için fork'layabilir veya pull request gönderebilirsiniz. Yeni özellik talepleriniz ve hata bildirimleriniz için issue açabilirsiniz.

---

**Not:** Bu proje örnek amaçlıdır ve geliştirilmeye açıktır. Güvenlik ve işlevsellik için ek geliştirmeler yapılabilir.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
