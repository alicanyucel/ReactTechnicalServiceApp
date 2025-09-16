
# Te## Özellikler
- **Kullanıcı Girişi:** Ant Design ile şık ve güvenli login ekranı
- **Kullanıcı Kaydı:** Yeni kullanıcı kayıt formu ile hesap oluşturma
- **Müşteri Yönetimi:** Tam CRUD işlemleri (Ekle, Listele, Güncelle, Sil) - Sol taraflı buton yerleşimi
- **Üç Tema Desteği:** Güneş, ay ve ateş ikonları ile açık/koyu/sarı-kırmızı tema değiştirme
- **Form Doğrulama:** E-posta formatı ve şifre eşleşme doğrulaması
- **Footer:** Açık mavi arka planlı, koyu siyah yazılı sabit footer (z-index ile en üstte)
- **Müşteri ve Servis Takibi:** Müşteri, cihaz ve servis kayıtlarını kolayca yönetme (geliştirilebilir)
- **Responsive Tasarım:** Tüm cihazlarda uyumlu ve modern arayüz
- **Kolay Kurulum:** Docker ve docker-compose ile hızlı başlatmais React Projesi

Bu proje, teknik servis yönetimi için modern bir web uygulamasıdır. Kullanıcı dostu arayüzü ve güçlü altyapısı ile servis taleplerinin, müşteri bilgilerinin ve işlemlerin kolayca yönetilmesini sağlar.

## Özellikler
- **Kullanıcı Girişi:** Ant Design ile şık ve güvenli login ekranı
- **Kullanıcı Kaydı:** Yeni kullanıcı kayıt formu ile hesap oluşturma
- **Müşteri Yönetimi:** Tam CRUD işlemleri (Ekle, Listele, Güncelle, Sil) - Sol taraflı buton yerleşimi
- **Form Doğrulama:** E-posta formatı ve şifre eşleşme doğrulaması
- **Footer:** Açık mavi arka planlı, koyu siyah yazılı sabit footer (z-index ile en üstte)
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
- React (Hooks, State Management)
- Ant Design (UI Components)
- Docker & Nginx
- JavaScript (ES6+)

## Proje Yapısı
```
my-react-app/
├── src/
│   ├── App.js          # Ana uygulama bileşeni
│   ├── Login.js        # Giriş formu
│   ├── Register.js     # Kayıt formu
│   ├── CustomerCRUD.js # Müşteri CRUD işlemleri
│   └── ...
├── Dockerfile          # Docker yapılandırması
├── docker-compose.yml  # Docker Compose yapılandırması
├── package.json        # Proje bağımlılıkları
└── README.md           # Bu dosya
```
```
my-react-app/
├── src/
│   ├── App.js          # Ana uygulama bileşeni
│   ├── Login.js        # Giriş formu
│   ├── Register.js     # Kayıt formu
│   └── ...
├── Dockerfile          # Docker yapılandırması
├── docker-compose.yml  # Docker Compose yapılandırması
├── package.json        # Proje bağımlılıkları
└── README.md           # Bu dosya
```

## Kullanım
1. Projeyi başlatın: `npm start`
2. Tarayıcıda http://localhost:3000 adresine gidin
3. Giriş yapmak için mevcut hesap kullanın veya "Kayıt olun" linkine tıklayın
4. Başarılı giriş sonrası müşteri yönetim paneline yönlendirileceksiniz
5. Üst sağdaki güneş/ay/ateş ikonuna tıklayarak açık/koyu/sarı-kırmızı tema arasında geçiş yapın
6. Müşteri ekleme, düzenleme ve silme işlemlerini gerçekleştirebilirsiniz

## Katkı ve Geliştirme
Projeye katkıda bulunmak için fork'layabilir veya pull request gönderebilirsiniz. Yeni özellik talepleriniz ve hata bildirimleriniz için issue açabilirsiniz.

---

**Not:** Bu proje örnek amaçlıdır ve geliştirilmeye açıktır. Güvenlik ve işlevsellik için ek geliştirmeler yapılabilir.
