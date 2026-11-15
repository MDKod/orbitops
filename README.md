# 🚀 OrbitOps

<h3 align="center">Optimize. Streamline. Manage.</h3>

<p align="center"><strong>Görev ve operasyon yönetimi için modüler REST API</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/JavaScript-CommonJS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/REST-API-5A45FF?style=for-the-badge" alt="REST API">
  <img src="https://img.shields.io/badge/Tests-node:test%20%2B%20Supertest-43853D?style=for-the-badge" alt="Tests">
</p>

---

## 📌 Proje Hakkında

**OrbitOps**, görev ve operasyon yönetimi için Node.js ve Express 5 tabanlı geliştirilmiş bir REST API projesidir. Görev oluşturma, listeleme, kimliğe göre getirme, güncelleme, kısmi güncelleme ve silme işlemlerini sunar.

Proje; katmanlı mimari, middleware tabanlı doğrulama, merkezi hata yönetimi, istek loglama ve otomatik testler üzerine kuruludur.

> [!NOTE]
> Bu doküman mevcut kod tabanında bulunan özellikleri açıklar. Yol haritasındaki maddeler, tamamlanmış özelliklerden ayrı tutulur.

## 🧭 İçindekiler

- [✨ Mevcut Özellikler](#-mevcut-özellikler)
- [🧰 Teknoloji Yığını](#-teknoloji-yığını)
- [🏗️ Mimari](#️-mimari)
- [📁 Proje Klasör Yapısı](#-proje-klasör-yapısı)
- [⚙️ Kurulum ve Başlangıç](#️-kurulum-ve-başlangıç)
- [🔌 API Referansı](#-api-referansı)
- [📄 Sayfalama](#-sayfalama-pagination)
- [🎯 Önceliğe Göre Filtreleme](#-önceliğe-göre-filtreleme)
- [🛡️ Doğrulama ve Uç Durumlar](#️-doğrulama-ve-uç-durumlar)
- [🧪 Testler](#-testler)
- [📸 Postman Ekran Görüntüleri](#-postman-ekran-görüntüleri)
- [📦 Yanıt Formatı ve HTTP Durumları](#-yanıt-formatı-ve-http-durumları)
- [💾 Veri Saklama](#-veri-saklama)
- [🗺️ Geliştirme Yol Haritası](#️-geliştirme-yol-haritası)
- [👩‍💻 Geliştirici](#-geliştirici)

---

## ✨ Mevcut Özellikler

| Özellik | Açıklama |
|---|---|
| ➕ Görev oluşturma | Yeni görev kaydı oluşturma |
| 📋 Görev listeleme | Görevleri listeleme |
| 🔎 Görev detayını getirme | Görevi benzersiz kimliğine göre getirme |
| ✏️ Görev güncelleme | `PUT` ile görev alanlarını güncelleme |
| 🩹 Kısmi güncelleme | `PATCH` ile yalnızca gönderilen alanları güncelleme |
| 🗑️ Görev silme | Görevi kimliğine göre silme |
| 🎯 Öncelik filtreleme | `low`, `medium`, `high`, `urgent` değerlerine göre filtreleme |
| 📄 Sayfalama | `page` ve `limit` parametreleriyle sayfalama |
| 🛡️ İstek doğrulama | Görev gövdesi ve sorgu parametrelerini middleware katmanında doğrulama |
| 📝 İstek loglama | HTTP metodu, endpoint, durum kodu, yanıt süresi ve zaman damgasını kaydetme |
| ⚠️ Hata yönetimi | Merkezi hata middleware'i ve 404 route yönetimi |
| 🧪 Otomatik testler | Node.js `node:test` ve Supertest ile endpoint ve doğrulama testleri |

### Görev veri modeli

| Alan | Açıklama |
|---|---|
| `id` | `crypto.randomUUID()` ile oluşturulan benzersiz görev kimliği |
| `title` | Görev başlığı |
| `description` | Görev açıklaması |
| `assignee` | Görevden sorumlu kişi |
| `priority` | `low`, `medium`, `high` veya `urgent` |
| `status` | Görev durumu; yeni görevlerde varsayılan `pending` |
| `dueDate` | Görev bitiş tarihi; belirtilmezse `null` |

Görev durumları için tanımlı değerler:

- `pending`
- `in_progress`
- `completed`

Görev güncelleme doğrulaması, `status` alanında bu değerlerin dışındaki girdileri reddeder.

---

## 🧰 Teknoloji Yığını

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black" alt="dotenv">
  <img src="https://img.shields.io/badge/Supertest-Testing-43853D?style=flat-square" alt="Supertest">
</p>

| Teknoloji | Kullanım amacı |
|---|---|
| Node.js | JavaScript çalışma ortamı |
| Express `^5.3.0` | HTTP sunucusu ve REST endpoint'leri |
| JavaScript / CommonJS | Uygulama dili ve modül sistemi |
| dotenv `^18.0.9` | Ortam değişkenlerini yükleme |
| `node:crypto` | `randomUUID()` ile benzersiz kimlik üretme |
| `node:test` | Yerleşik test çalıştırıcısı |
| Supertest `^7.3.2` | HTTP endpoint testleri |

---

## 🏗️ Mimari

OrbitOps, **Separation of Concerns (Sorumlulukların Ayrılması)** yaklaşımını izleyen katmanlı bir yapı kullanır.

```text
HTTP Request
     │
     ▼
   Routes
     │
     ▼
 Middleware
     │
     ▼
 Controller
     │
     ▼
  Service
     │
     ▼
  Data Store
```

| Katman | Sorumluluk |
|---|---|
| Routes | Endpoint'leri tanımlar ve ilgili middleware/controller akışını kurar |
| Middlewares | İstek doğrulama, loglama ve ortak HTTP işlemlerini yürütür |
| Controllers | HTTP isteklerini işler ve uygun yanıtları oluşturur |
| Services | Controller ile veri katmanı arasındaki uygulama servislerini sağlar |
| Data Store | Görev kayıtlarını bellek içindeki dizide saklar ve yönetir |

### Uygulama başlangıç akışı

- `src/server.js`, Express uygulamasını ilgili portta dinlemeye başlatır.
- `src/app.js`, Express uygulamasını oluşturur; JSON parsing, logger, task routes, 404 ve error handler middleware'lerini bağlar.
- `src/config/config.js`, `PORT` ve `NODE_ENV` yapılandırmasını sağlar.

Bu ayrım, uygulamanın test edilebilirliğini artırır. `app.js` uygulamayı dışa aktardığı için testler HTTP sunucusunu ayrıca başlatmadan Supertest üzerinden çalışabilir.

---

## 📁 Proje Klasör Yapısı

```text
OrbitOps/
├── docs/
│   ├── project-introduction.md
│   └── screenshots/
│       ├── Non-existing Task ID.jpg
│       ├── create-task.jpg
│       ├── delete-task.jpg
│       ├── empty-request-body.jpg
│       ├── get-task-by-id.jpg
│       ├── get-tasks.jpg
│       ├── invalid-priority.jpg
│       ├── pagination.jpg
│       ├── partial-task-update.jpg
│       ├── priority-filter.jpg
│       └── update.task.jpg
├── src/
│   ├── app.js
│   ├── config/
│   │   └── config.js
│   ├── constants/
│   │   └── taskConstants.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── data/
│   │   └── taskStore.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── notFound.js
│   │   ├── validatePagination.js
│   │   ├── validatePriority.js
│   │   ├── validateTask.js
│   │   └── validateUpdateTask.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── taskService.js
│   └── server.js
├── tests/
│   ├── paginationValidation.test.js
│   ├── priorityValidation.test.js
│   ├── taskPatch.test.js
│   ├── taskQuery.test.js
│   ├── taskRoutes.test.js
│   └── taskUpdate.test.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Kurulum ve Başlangıç

### Gereksinimler

- [Node.js](https://nodejs.org/)
- npm

### 1. Depoyu klonlayın

```bash
git clone <your-repository-url>
cd OrbitOps
```

> `git clone` komutundaki adresi kendi GitHub depo adresinizle değiştirin.

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini yapılandırın

Proje kök dizininde `.env` dosyası oluşturun:

```env
PORT=3000
NODE_ENV=development
```

| Değişken | Varsayılan | Açıklama |
|---|---|---|
| `PORT` | `3000` | API sunucusunun portu |
| `NODE_ENV` | `development` | Uygulama çalışma ortamı |

> [!WARNING]
> `.env` dosyasını gizli bilgiler içeriyorsa Git deposuna eklemeyin. Gerçek ortam değerlerini paylaşmak yerine güvenli örnek değerler içeren bir `.env.example` dosyası kullanabilirsiniz.

### 4. Geliştirme sunucusunu çalıştırın

```bash
npm run dev
```

Sunucu varsayılan ayarlarla şu adreste çalışır:

```text
http://localhost:3000
```

Üretim/normal başlatma komutu:

```bash
npm start
```

### 5. API'nin çalıştığını kontrol edin

```http
GET /
```

Başarılı yanıt, API'nin çalıştığını ve aktif ortamı bildirir.

---

## 🔌 API Referansı

### Temel URL

```text
http://localhost:3000
```

### Endpoint listesi

| HTTP metodu | Endpoint | Açıklama |
|---|---|---|
| `GET` | `/` | API sağlık/çalışma kontrolü |
| `POST` | `/api/tasks` | Yeni görev oluşturur |
| `GET` | `/api/tasks` | Görevleri filtreleme ve sayfalama seçenekleriyle listeler |
| `GET` | `/api/tasks/:id` | Belirtilen kimliğe sahip görevi getirir |
| `PUT` | `/api/tasks/:id` | Mevcut görevi günceller |
| `PATCH` | `/api/tasks/:id` | Mevcut görevin gönderilen alanlarını kısmi olarak günceller |
| `DELETE` | `/api/tasks/:id` | Belirtilen görevi siler |

### ➕ Yeni görev oluşturma

```http
POST /api/tasks
Content-Type: application/json
```

Örnek istek gövdesi:

```json
{
  "title": "API dokümantasyonunu hazırla",
  "description": "Görev endpointlerini ve doğrulama kurallarını dokümante et.",
  "assignee": "Meryem",
  "priority": "high"
}
```

Yeni görev oluşturulduğunda:

- Benzersiz `id` otomatik oluşturulur.
- `status` varsayılan olarak `pending` atanır.
- `dueDate` gönderilmezse `null` olur.

`201 Created` başarılı oluşturma yanıtında yeni görev verisi döndürülür.

### 📋 Görevleri listeleme

```http
GET /api/tasks
```

Sayfalama ve filtreleme parametreleri birlikte kullanılabilir:

```http
GET /api/tasks?page=1&limit=10&priority=high
```

Detaylar için [Sayfalama](#-sayfalama-pagination) ve [Önceliğe Göre Filtreleme](#-önceliğe-göre-filtreleme) bölümlerine bakın.

### 🔎 Kimliğe göre görev getirme

```http
GET /api/tasks/:id
```

Örnek:

```http
GET /api/tasks/your-task-id
```

Görev bulunamazsa `404 Not Found` yanıtı döndürülür.

### ✏️ Görev güncelleme

```http
PUT /api/tasks/:id
Content-Type: application/json
```

Örnek istek gövdesi:

```json
{
  "title": "Güncellenmiş görev",
  "description": "Görev açıklaması güncellendi.",
  "assignee": "Meryem",
  "priority": "high",
  "status": "in_progress",
  "dueDate": "2026-12-01"
}
```

Güncelleme isteği `validateUpdateTask` middleware'inden geçer. İzin verilen alanlar `title`, `description`, `assignee`, `priority`, `status` ve `dueDate` şeklindedir.

### 🩹 Görevin bir bölümünü güncelleme

```http
PATCH /api/tasks/:id
Content-Type: application/json
```

PATCH yalnızca gönderilen alanları günceller; gönderilmeyen alanlar mevcut değerlerini korur.

Örnek:

```json
{
  "status": "completed"
}
```

PATCH ve PUT rotaları `validateUpdateTask` middleware'ini kullanır. Boş istek gövdesi veya izin verilmeyen alanlar `400 Bad Request` ile reddedilir.

### 🗑️ Görev silme

```http
DELETE /api/tasks/:id
```

Belirtilen kimliğe sahip görev silinir. Görev bulunamazsa `404 Not Found` yanıtı döndürülür.

---

## 📄 Sayfalama (Pagination)

`GET /api/tasks` endpoint'i sayfa tabanlı sayfalama desteği sunar.

### Parametreler

| Parametre | Varsayılan | Kural |
|---|---:|---|
| `page` | `1` | Pozitif bir tam sayı olmalıdır |
| `limit` | `10` | 1 ile 100 arasında bir tam sayı olmalıdır |

Örnek:

```http
GET /api/tasks?page=2&limit=5
```

Veri katmanında başlangıç indeksi şu şekilde hesaplanır:

```js
const offset = (page - 1) * limit;
```

### Sayfalama yanıtı

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [],
  "pagination": {
    "totalTasks": 0,
    "totalPages": 0,
    "currentPage": 1,
    "limit": 10
  }
}
```

| Alan | Açıklama |
|---|---|
| `totalTasks` | Filtre uygulandıktan sonra bulunan toplam görev sayısı |
| `totalPages` | Toplam görev sayısına ve sayfa başına kayıt sayısına göre hesaplanan sayfa sayısı |
| `currentPage` | İstenen mevcut sayfa |
| `limit` | Sayfa başına gösterilecek maksimum kayıt sayısı |

> **İşlem sırası:** Önce priority filtresi uygulanır, ardından sonuçlar sayfalanır.

---

## 🎯 Önceliğe Göre Filtreleme

Görevler `priority` sorgu parametresiyle filtrelenebilir.

### Kabul edilen değerler

| Değer | Anlamı |
|---|---|
| `low` | Düşük |
| `medium` | Orta |
| `high` | Yüksek |
| `urgent` | Acil |

Değerler büyük/küçük harfe duyarlıdır.

Örnek:

```http
GET /api/tasks?page=1&limit=10&priority=high
```

- `priority` parametresi gönderilmezse tüm öncelik seviyelerindeki görevler listelenir.
- Geçerli bir priority değeriyle eşleşen görev bulunamazsa API boş `data` dizisiyle `200 OK` döndürür.
- Eşleşme bulunmaması sunucu hatası değildir.

---

## 🛡️ Doğrulama ve Uç Durumlar

Doğrulama middleware'leri geçersiz istekleri controller katmanına ulaşmadan reddeder.

### Görev oluşturma ve güncelleme doğrulaması

- Görev oluşturma verileri `validateTask.js` ile doğrulanır.
- PUT ve PATCH gövdeleri `validateUpdateTask.js` ile doğrulanır.
- Güncelleme isteği boş olamaz.
- Yalnızca izin verilen alanlar kabul edilir: `title`, `description`, `assignee`, `priority`, `status`, `dueDate`.
- `title` ve `assignee` boş olmayan string olmalıdır.
- `description` string olmalıdır.
- `priority`, `low`, `medium`, `high` veya `urgent` değerlerinden biri olmalıdır.
- `status`, `pending`, `in_progress` veya `completed` değerlerinden biri olmalıdır.
- `dueDate`, `null` veya JavaScript tarafından geçerli tarih olarak ayrıştırılabilen bir string olabilir.
- `id` gibi izin verilmeyen alanlar güncelleme gövdesinde kabul edilmez.

Bu kuralları ihlal eden güncelleme istekleri `400 Bad Request` ile reddedilir.

### Sayfalama doğrulaması

Aşağıdaki durumlarda `400 Bad Request` döndürülür:

- `page` sıfır veya negatif olduğunda.
- `page` tam sayı olmadığında.
- `page` veya `limit` boş gönderildiğinde.
- `limit` 100 değerinden büyük olduğunda.
- `page` veya `limit` parametresi birden fazla kez gönderildiğinde.

### Priority doğrulaması

Aşağıdaki durumlarda `400 Bad Request` döndürülür:

- `priority` parametresi boş gönderildiğinde.
- `priority` kabul edilen değerlerden biri olmadığında.
- `HIGH` gibi farklı büyük/küçük harf kullanıldığında.
- Birden fazla priority değeri gönderildiğinde.

Örnek geçersiz istek:

```http
GET /api/tasks?priority=high&priority=low
```

`priority` parametresi hiç gönderilmezse doğrulama başarılı olur ve filtre uygulanmadan görevler listelenir.

### Middleware sorumlulukları

| Middleware | Sorumluluk |
|---|---|
| `logger.js` | HTTP istek ve yanıt bilgilerini, yanıt süresini ve zaman damgasını kaydeder |
| `validateTask.js` | Görev oluşturma verilerini doğrular |
| `validateUpdateTask.js` | PUT ve PATCH güncelleme verilerini doğrular |
| `validatePriority.js` | İsteğe bağlı priority sorgu parametresini doğrular |
| `validatePagination.js` | `page` ve `limit` değerlerini doğrular ve sayfalama bilgilerini request nesnesine ekler |
| `notFound.js` | Tanımlı route'larla eşleşmeyen istekler için 404 yanıtı oluşturur |
| `errorHandler.js` | Uygulama hatalarını merkezi olarak ele alır |

### Priority ve pagination edge-case sonuçları

| Test senaryosu | Beklenen HTTP durumu |
|---|---:|
| İlk sayfayı listeleme | `200` |
| İkinci sayfayı listeleme | `200` |
| Priority filtresi ve sayfalamayı birlikte kullanma | `200` |
| Eşleşen priority sonucu bulunmaması | `200` |
| Negatif veya sıfır page | `400` |
| Ondalıklı page | `400` |
| Boş limit | `400` |
| 100'den büyük limit | `400` |
| Tekrarlanan page parametresi | `400` |
| Büyük harfli priority (`HIGH`) | `400` |
| Tekrarlanan priority parametresi | `400` |
| Boş priority | `400` |
| Priority parametresinin gönderilmemesi | `200` |

---

## 🧪 Testler

OrbitOps, Node.js'in yerleşik `node:test` modülü ve Supertest kullanılarak test edilir.

Testleri çalıştırmak için:

```bash
npm test
```

Geliştirme sırasında tek bir test dosyasını çalıştırmak için:

```bash
node --test tests/taskPatch.test.js
```

### Test dosyaları

| Dosya | Kapsam |
|---|---|
| `tests/taskRoutes.test.js` | Görev route işlemleri |
| `tests/taskUpdate.test.js` | PUT güncelleme ve doğrulama senaryoları |
| `tests/taskPatch.test.js` | PATCH kısmi güncelleme, bulunamayan görev ve ID değiştirme girişimi |
| `tests/taskQuery.test.js` | Görev sorgulama davranışları |
| `tests/paginationValidation.test.js` | Sayfalama parametreleri ve geçersiz girdiler |
| `tests/priorityValidation.test.js` | Priority parametresi ve geçersiz girdiler |

**Son bildirilen test sonucu:** 32 test başarılı, 0 başarısız. Güncel kod üzerinde yeniden doğrulamak için `npm test` komutunu kullanın.

> [!NOTE]
> Status alanı için doğrulama middleware'de uygulanmıştır. Bu alanın geçerli/geçersiz değerlerini özel olarak sınayan ayrı test senaryoları henüz eklenmemiştir.

---

## 📸 Postman Ekran Görüntüleri

Postman ile gerçekleştirilen API kontrollerinden alınan ekran görüntüleri `docs/screenshots/` dizininde tutulur.

| Senaryo | Görsel |
|---|---|
| Görev oluşturma | [create-task.jpg](docs/screenshots/create-task.jpg) |
| Görevleri listeleme | [get-tasks.jpg](docs/screenshots/get-tasks.jpg) |
| Görevi ID ile getirme | [get-task-by-id.jpg](docs/screenshots/get-task-by-id.jpg) |
| Olmayan görev ID'si | [Non-existing Task ID.jpg](docs/screenshots/Non-existing%20Task%20ID.jpg) |
| Görev güncelleme (PUT) | [update.task.jpg](docs/screenshots/update.task.jpg) |
| Kısmi görev güncelleme (PATCH) | [partial-task-update.jpg](docs/screenshots/partial-task-update.jpg) |
| Görev silme | [delete-task.jpg](docs/screenshots/delete-task.jpg) |
| Boş istek gövdesi | [empty-request-body.jpg](docs/screenshots/empty-request-body.jpg) |
| Geçersiz priority | [invalid-priority.jpg](docs/screenshots/invalid-priority.jpg) |
| Sayfalama | [pagination.jpg](docs/screenshots/pagination.jpg) |
| Priority filtresi | [priority-filter.jpg](docs/screenshots/priority-filter.jpg) |

---

## 📦 Yanıt Formatı ve HTTP Durumları

Başarılı yanıtlar `success`, kullanıcıya yönelik `message` ve yanıt verilerini içeren `data` alanlarını kullanır. Listeleme yanıtlarında ayrıca `pagination` alanı bulunur.

Örnek:

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [],
  "pagination": {
    "totalTasks": 0,
    "totalPages": 0,
    "currentPage": 1,
    "limit": 10
  }
}
```

Hata yanıtı örneği:

```json
{
  "success": false,
  "message": "Task not found"
}
```

| HTTP durumu | Anlamı |
|---|---|
| `200 OK` | İstek başarılı |
| `201 Created` | Görev başarıyla oluşturuldu |
| `400 Bad Request` | İstek gövdesi veya sorgu parametreleri geçersiz |
| `404 Not Found` | İstenen görev veya route bulunamadı |
| `500 Internal Server Error` | Beklenmeyen sunucu hatası |

Beklenmeyen sunucu hatalarında istemciye genel bir hata mesajı döndürülür; hata ayrıntıları sunucu tarafında loglanır.

---

## 💾 Veri Saklama

Mevcut uygulama, görev kayıtlarını JavaScript bellek içi bir dizide (**in-memory array**) saklar.

> [!IMPORTANT]
> Görev verileri kalıcı değildir. Sunucu yeniden başlatıldığında bellek içindeki görev listesi sıfırlanır. Kalıcı veritabanı entegrasyonu gelecek geliştirme adımlarından biridir.

---

## 🗺️ Geliştirme Yol Haritası

Aşağıdaki maddeler mevcut kapsamın ötesindeki geliştirme fikirleridir:

- [ ] Görev durumuna, sorumlu kişiye, metin aramasına ve tarih aralığına göre ek filtreler.
- [ ] Belirlenen alanlara ve sıralama yönüne göre sıralama.
- [ ] Özet, durum, öncelik, sorumlu kişiler ve geciken görevler için raporlama endpoint'leri.
- [ ] Kalıcı veritabanı entegrasyonu.
- [ ] Status doğrulaması için özel geçerli/geçersiz değer testleri.
- [ ] Postman koleksiyonu ve genişletilmiş API dokümantasyonu.

> Yol haritasındaki bir özellik, uygulandığı ve doğrulandığı zaman mevcut özellikler bölümüne taşınmalıdır.

---


OrbitOps; backend geliştirme, REST API tasarımı, katmanlı mimari, doğrulama ve test süreçlerinde pratik yapmak; modüler, sürdürülebilir ve doğrulanabilir API çözümleri geliştirmek amacıyla hazırlanmaktadır.

---

<p align="center">
  <strong>OrbitOps</strong> · Optimize. Streamline. Manage.
</p>

## 👩‍💻 Geliştirici

**Geliştiren:** Meryem Doğan Kurt

**GitHub:** [@MDKod](https://github.com/MDKod)


## 🚀 Project Preview

<p align="center">
  <img
    src="docs/screenshots/orbitops-preview.jpg"
    alt="OrbitOps Project Preview"
    width="850"
  />
</p>