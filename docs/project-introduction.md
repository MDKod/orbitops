#  OrbitOps – Proje Tanıtım Dokümanı

**Optimize. Streamline. Manage.**

## 1. Projenin Amacı

OrbitOps, görevlerin oluşturulmasını, çalışanlara atanmasını, önceliklerinin belirlenmesini ve durumlarının takip edilmesini sağlayan bir REST API uygulamasıdır.

Projenin temel amacı, görev yönetimi süreçlerini merkezi ve düzenli bir yapı üzerinden yürütmek; görevlerle ilgili işlemleri HTTP tabanlı API endpoint'leri aracılığıyla gerçekleştirmektir.

Uygulama, görev yönetimi senaryolarında kullanılabilecek temel backend işlevlerini ve RESTful API yaklaşımını göstermeyi hedeflemektedir.

## 2. Kullanım Senaryosu

Bir ekip içerisinde yöneticinin yeni görevler oluşturduğunu ve bu görevleri çalışanlara atadığını düşünelim.

OrbitOps üzerinden:

- Yeni görev oluşturulabilir.
- Göreve başlık, açıklama, sorumlu kişi ve öncelik bilgisi eklenebilir.
- Görev durumu takip edilebilir.
- Görev bilgileri PUT isteğiyle tamamen, PATCH isteğiyle kısmen güncellenebilir.
- Görevler listelenebilir ve belirli bir ID üzerinden görüntülenebilir.
- Görevler silinebilir.
- Görevler önceliklerine göre filtrelenebilir ve sayfalanabilir.

Bu yapı, temel görev ve operasyon yönetimi ihtiyaçlarını API üzerinden karşılamayı amaçlamaktadır.

## 3. Sistem Genel Bakışı

OrbitOps, Node.js ve Express.js kullanılarak geliştirilmiş bir backend REST API uygulamasıdır.

Uygulama, sorumlulukları ayrılmış modüler bir yapıda düzenlenmiştir:

- **Routes:** Gelen HTTP isteklerini ilgili controller fonksiyonlarına yönlendirir.
- **Controllers:** İstekleri işler ve uygun HTTP yanıtlarını oluşturur.
- **Services:** Controller katmanı ile veri işlemleri arasındaki ayrımı sağlar.
- **Data Store:** Görev kayıtlarının oluşturulması, okunması, güncellenmesi ve silinmesini gerçekleştirir.
- **Middlewares:** İstek günlükleme, veri doğrulama ve hata yönetimi işlemlerini yürütür.

Veriler mevcut sürümde uygulama belleğinde (in-memory) tutulmaktadır. Bu nedenle uygulama yeniden başlatıldığında görev kayıtları kalıcı olarak saklanmaz.

## 4. Temel Özellikler

| Özellik | Açıklama |
|---|---|
| Create | Yeni görev oluşturma |
| Read | Görevleri listeleme ve ID ile görüntüleme |
| Update | PUT ile tam, PATCH ile kısmi güncelleme |
| Delete | Görev silme |
| Assignment | Görevi sorumlu bir çalışana atama |
| Status Tracking | Görev durumunu takip etme |
| Priority Management | Görev önceliğini belirleme ve filtreleme |
| Pagination | Görev listesini sayfalara ayırma |
| Request Logging | HTTP isteklerini günlükleme |
| Validation | Geçersiz istek verilerini kontrol etme |

## 5. Kullanılan Teknolojiler

- **Node.js:** JavaScript çalışma ortamı
- **Express.js:** REST API geliştirme çatısı
- **JavaScript:** Uygulama programlama dili
- **Supertest:** HTTP endpoint testleri
- **Node.js Test Runner:** Otomatik test altyapısı
- **Postman:** API isteklerinin manuel test edilmesi

## 6. Test ve Doğrulama

Projenin otomatik testleri Node.js Test Runner ve Supertest kullanılarak gerçekleştirilmiştir.

Son doğrulamada toplam **32 otomatik testin tamamı başarılı** olmuştur.

Postman üzerinden temel CRUD işlemleri, güncelleme senaryoları, geçersiz istekler, öncelik filtreleme ve sayfalama test edilmiştir.

Testlere ait ekran görüntüleri `docs/screenshots/` klasöründe saklanmaktadır.

## 7. Sonuç

OrbitOps, görev yönetimi süreçlerini REST API üzerinden gerçekleştiren modüler bir backend uygulamasıdır.

Proje; CRUD işlemleri, routing yapısı, middleware kullanımı, veri doğrulama, hata yönetimi ve otomatik test süreçlerini bir araya getirerek temel backend geliştirme yaklaşımlarını uygulamalı olarak ortaya koymaktadır.