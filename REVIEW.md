# REVIEW.md — Perde 2: naifOrtak Eleştirisi

## Kullanılan Prompt

> "iki listedeki ortak elemanları bulan bir fonksiyon yaz"

Bu prompt kasıtlı olarak kısa ve muğlak bırakıldı. Amaç, AI'ın "makul ama eksik" bir ilk taslak üretmesini gözlemlemek.

---

## Dört Soruluk Değerlendirme Yöntemi

### 1. Doğruluk — "Fonksiyon her durumda doğru çalışıyor mu?"

**Sorun:** naifOrtak tekrarlayan elemanları filtrelemiyor.

```js
naifOrtak([1, 1, 2], [1, 2]) // → [1, 1, 2] döner, beklenen: [1, 2]
```

Liste1'deki tekrarlayan `1` her seferinde liste2'deki `1`'le eşleşiyor ve sonuca iki kez ekleniyor. Prompt bu durumu belirtmediği için AI da belirtmedi — bu tamamen beklenen bir "ilk taslak" davranışı.

**hizliOrtak'taki düzeltme:** `goruldu` Set'i ile her benzersiz eleman yalnızca bir kez sonuca ekleniyor.

---

### 2. Ölçekleme — "Büyük veride nasıl davranır? (Big-O)"

| Fonksiyon  | Zaman Karmaşıklığı | Alan Karmaşıklığı |
|------------|--------------------|--------------------|
| naifOrtak  | O(n × m)           | O(k) — k: ortak eleman sayısı |
| hizliOrtak | O(n + m)           | O(m + k) — Set ve sonuç için |

**naifOrtak neden yavaş?**  
Her `liste1` elemanı için `liste2`'nin tamamı taranıyor (iç içe döngü).  
n = m = 10.000 için → 100.000.000 karşılaştırma.

**hizliOrtak neden hızlı?**  
`new Set(liste2)` ile liste2 önce hash tablosuna alınıyor (O(m)).  
Ardından liste1 tek bir geçişle taranıyor (O(n)).  
Set.has() ortalama O(1) → toplam O(n + m).

**Ölçüm sonuçları (10.000 + 10.000 eleman):**

```
naifOrtak:  ~182 ms
hizliOrtak: ~4.6 ms
```

Fark: **~39 kat**. n büyüdükçe bu fark karesel (quadratic) büyür.

---

### 3. Okunabilirlik — "Başka bir geliştirici kodu anlıyor mu?"

**naifOrtak'taki sorunlar:**
- Değişken adları (`i`, `j`) neyi temsil ettiğini söylemiyor.
- İç içe döngü mantığını hemen kavramak zor.
- Davranış hakkında hiç yorum yok.

**hizliOrtak'ta iyileştirme:**
- `set2`, `goruldu`, `eleman` — isimler niyeti anlatıyor.
- `for...of` döngüsü, index aritmetiğinden daha okunabilir.
- Kısa bir yorum algoritma mantığını özetliyor.

---

### 4. Yan Etki — "Fonksiyon girdi listelerini değiştiriyor mu?"

**naifOrtak:** Hayır, mutate etmiyor — yalnızca okuma yapıyor.  
**hizliOrtak:** Hayır, `Set` yeni bir veri yapısı; listeler dokunulmuyor.

Her iki fonksiyon da bu açıdan güvenli. Test dosyasında bunu açıkça kanıtlayan bir test var:

```js
it("girdi listelerini mutate etmez", () => { ... });
```

---

## Özet Tablo

| Kriter        | naifOrtak       | hizliOrtak        |
|---------------|-----------------|-------------------|
| Doğruluk      | Eksik (tekrar)  | Tam               |
| Zaman         | O(n × m)        | O(n + m)          |
| Hız (10K)     | ~182 ms         | ~4.6 ms           |
| Okunabilirlik | Zayıf           | İyi               |
| Yan etki      | Yok             | Yok               |

---

## CC ile Karşılaştırma Notu

Naif çözümün eksikliğini (tekrarlayan eleman sorunu) eleştiri sürecinde ben fark ettim.  
Sonra CC'ye "bu fonksiyonun karmaşıklığı nedir, nasıl iyileşir?" diye sorduğumda CC de aynı O(n²) → O(n+m) dönüşümünü önerdi ve `Set` çözümüne ulaştı.

**CC'nin yakaladığı:** Zaman karmaşıklığı sorunu ve Set önerisi.  
**CC'nin kaçırdığı (ilk taslakta):** Tekrarlayan eleman durumunu varsayılan davranış olarak belirtmedi — prompt muğlak olduğu için sessiz kaldı.  
**Ders:** AI'a kısa prompt verince "makul varsayımlı" bir çözüm üretir; edge case'leri ya açık söylenmeli ya da eleştiri aşamasında yakalanmalıdır.
