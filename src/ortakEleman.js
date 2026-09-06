// naifOrtak: iki listedeki ortak elemanları bulan fonksiyon
// (Claude Code'un kısa/muğlak prompttan ürettiği ilk taslak — düzeltilmedi)
export function naifOrtak(liste1, liste2) {
  const sonuc = [];
  for (let i = 0; i < liste1.length; i++) {
    for (let j = 0; j < liste2.length; j++) {
      if (liste1[i] === liste2[j]) {
        sonuc.push(liste1[i]);
      }
    }
  }
  return sonuc;
}

// hizliOrtak: Set kullanarak O(n+m) karmaşıklıkla aynı işi yapar.
// Her eleman yalnızca bir kez sonuca eklenir (küme davranışı).
export function hizliOrtak(liste1, liste2) {
  const set2 = new Set(liste2);
  const goruldu = new Set();
  const sonuc = [];
  for (const eleman of liste1) {
    if (set2.has(eleman) && !goruldu.has(eleman)) {
      sonuc.push(eleman);
      goruldu.add(eleman);
    }
  }
  return sonuc;
}
