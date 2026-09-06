/**
 * Tüm kayıtların tutar toplamını döner.
 * reduce: birikimli toplama — acc başlangıçta 0, her adımda kayit.tutar eklenir.
 */
export function toplamTutar(kayitlar) {
  return kayitlar.reduce((acc, kayit) => acc + kayit.tutar, 0);
}

/**
 * Kayıtları kategoriye göre gruplar; { kategori: [kayit, ...] } nesnesi döner.
 * Orijinal diziyi değiştirmez — sadece referansları taşır, kayıtları kopyalar.
 */
export function kategoriyeGoreGrupla(kayitlar) {
  return kayitlar.reduce((gruplar, kayit) => {
    const anahtar = kayit.kategori;
    if (!gruplar[anahtar]) {
      gruplar[anahtar] = [];
    }
    gruplar[anahtar].push(kayit);
    return gruplar;
  }, {});
}

/**
 * Tutara göre azalan sırada ilk n kaydı döner.
 * slice() ile orijinal diziyi kopyalar, sort() kopyayı sıralar → mutasyon yok.
 */
export function enYuksekN(kayitlar, n) {
  return kayitlar
    .slice()
    .sort((a, b) => b.tutar - a.tutar)
    .slice(0, n);
}

/**
 * id → kayıt eşlemesi olan bir Map döner; O(n) erişim sağlar.
 * Orijinal dizi değişmez, Map yeni bir veri yapısıdır.
 */
export function indeksKur(kayitlar) {
  return new Map(kayitlar.map((kayit) => [kayit.id, kayit]));
}

/**
 * Birden fazla kayıtta geçen id'leri bulur.
 * Dönen dizi: [{ id, adet }] — yalnızca tekrarlananlar.
 */
export function tekrarlayanlariBul(kayitlar) {
  const sayac = kayitlar.reduce((acc, kayit) => {
    acc[kayit.id] = (acc[kayit.id] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(sayac)
    .filter(([, adet]) => adet > 1)
    .map(([id, adet]) => ({ id, adet }));
}
