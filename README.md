# SWE101 — Veri Yapıları ve Algoritmik Düşünme

> **Staj ödevi:** Veri dönüştüren saf fonksiyonlar + AI kodunu değerlendirme yöntemi.

## Kurulum

```bash
npm install
```

## Testleri Çalıştır

```bash
npm test
```

Çıktı: **33 test, tümü geçmeli.**

## Performans Ölçümü

```bash
node src/olcum.js
```

10.000 elemanlı iki listede `naifOrtak` vs `hizliOrtak` süresini karşılaştırır.

---

## Perde 1 — Dönüştürme Fonksiyonları

`src/donusturucular.js` içindeki 5 saf fonksiyon:

| Fonksiyon               | Ne yapar?                              |
|-------------------------|----------------------------------------|
| `toplamTutar(kayitlar)` | Tüm kayıtların tutar toplamı (reduce)  |
| `kategoriyeGoreGrupla`  | Kategori → kayıt listesi eşlemesi      |
| `enYuksekN(kayitlar,n)` | Tutara göre ilk N kayıt (mutasyonsuz)  |
| `indeksKur(kayitlar)`   | id → kayıt Map'i                       |
| `tekrarlayanlariBul`    | Birden çok geçen id'leri raporlar      |

**Tüm fonksiyonlar girdisini değiştirmez** — her biri için mutasyon testi mevcuttur.

Örnek veri seti: `src/veri.js` (25 sipariş kaydı, bir kasıtlı tekrarlayan id içerir).

---

## Perde 2 — AI Kodunu Değerlendirme

`src/ortakEleman.js` iki fonksiyon içerir:

- **`naifOrtak`** — "iki listedeki ortak elemanları bul" kısa promptundan üretilen ilk taslak. O(n×m).
- **`hizliOrtak`** — Set kullanılarak iyileştirilmiş sürüm. O(n+m).

Detaylı eleştiri için → [REVIEW.md](./REVIEW.md)

---

## Ne Öğrendim

- `reduce` ile hem toplama hem de gruplama yapılabileceğini gördüm; her kullanımda birikimli değerin ne olduğunu açıkça düşünmek gerekiyor.
- `slice()` + `sort()` zinciri immutability için kritik — `sort()` orijinal diziyi değiştiriyor, önce kopyalamak şart.
- AI'ın kısa/muğlak prompta verdiği ilk taslak "çalışan ama eksik" oluyor. Edge case'leri (tekrarlayan eleman, boş liste) belirtmezsen AI da belirtmiyor.
- Big-O analizi soyut görünüyor ama `console.time` ölçümü onu somutlaştırdı: O(n²) vs O(n+m) farkı 10K'da ~39 kat olarak gözüktü.
