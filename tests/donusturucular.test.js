import { describe, it, expect } from "vitest";
import {
  toplamTutar,
  kategoriyeGoreGrupla,
  enYuksekN,
  indeksKur,
  tekrarlayanlariBul,
} from "../src/donusturucular.js";

// --- Test verisi ---
const ornekKayitlar = [
  { id: "A1", kategori: "Elektronik", tutar: 1000, tarih: "2025-01-01" },
  { id: "A2", kategori: "Giyim",      tutar: 200,  tarih: "2025-01-02" },
  { id: "A3", kategori: "Elektronik", tutar: 500,  tarih: "2025-01-03" },
  { id: "A2", kategori: "Giyim",      tutar: 300,  tarih: "2025-01-04" }, // tekrarlayan id
];

// =============================================================
// toplamTutar
// =============================================================
describe("toplamTutar", () => {
  it("birden çok kayıtta doğru toplamı döner", () => {
    expect(toplamTutar(ornekKayitlar)).toBe(2000);
  });

  it("boş listede 0 döner", () => {
    expect(toplamTutar([])).toBe(0);
  });

  it("tek kayıtta o kaydın tutarını döner", () => {
    expect(toplamTutar([{ id: "X1", kategori: "A", tutar: 750, tarih: "" }])).toBe(750);
  });

  it("girdi dizisini mutate etmez", () => {
    const kopyaIndex = ornekKayitlar.length;
    toplamTutar(ornekKayitlar);
    expect(ornekKayitlar).toHaveLength(kopyaIndex);
  });
});

// =============================================================
// kategoriyeGoreGrupla
// =============================================================
describe("kategoriyeGoreGrupla", () => {
  it("kayıtları doğru kategorilere dağıtır", () => {
    const sonuc = kategoriyeGoreGrupla(ornekKayitlar);
    expect(sonuc["Elektronik"]).toHaveLength(2);
    expect(sonuc["Giyim"]).toHaveLength(2);
  });

  it("boş listede boş nesne döner", () => {
    expect(kategoriyeGoreGrupla([])).toEqual({});
  });

  it("tek kayıtta tek kategorili nesne döner", () => {
    const tek = [{ id: "T1", kategori: "Spor", tutar: 100, tarih: "" }];
    const sonuc = kategoriyeGoreGrupla(tek);
    expect(Object.keys(sonuc)).toEqual(["Spor"]);
    expect(sonuc["Spor"]).toHaveLength(1);
  });

  it("girdi dizisini mutate etmez", () => {
    const onceki = ornekKayitlar.map((k) => ({ ...k }));
    kategoriyeGoreGrupla(ornekKayitlar);
    expect(ornekKayitlar).toEqual(onceki);
  });
});

// =============================================================
// enYuksekN
// =============================================================
describe("enYuksekN", () => {
  it("en yüksek 2 kaydı tutara göre azalan sırada döner", () => {
    const sonuc = enYuksekN(ornekKayitlar, 2);
    expect(sonuc[0].tutar).toBe(1000);
    expect(sonuc[1].tutar).toBe(500);
  });

  it("boş listede boş dizi döner", () => {
    expect(enYuksekN([], 3)).toEqual([]);
  });

  it("n > kayıt sayısında tüm kayıtları döner", () => {
    expect(enYuksekN(ornekKayitlar, 100)).toHaveLength(ornekKayitlar.length);
  });

  it("orijinal diziyi sırasını değiştirmez (mutasyon kanıtı)", () => {
    const oncekiIlkTutar = ornekKayitlar[0].tutar;
    enYuksekN(ornekKayitlar, 2);
    expect(ornekKayitlar[0].tutar).toBe(oncekiIlkTutar);
    expect(ornekKayitlar[0].id).toBe("A1");
  });
});

// =============================================================
// indeksKur
// =============================================================
describe("indeksKur", () => {
  it("her id için doğru kaydı döner", () => {
    const idx = indeksKur(ornekKayitlar);
    expect(idx.get("A1").tutar).toBe(1000);
    expect(idx.get("A3").tutar).toBe(500);
  });

  it("boş listede boş Map döner", () => {
    expect(indeksKur([]).size).toBe(0);
  });

  it("tek kayıtta Map'in boyutu 1'dir", () => {
    const tek = [{ id: "Z9", kategori: "Kitap", tutar: 50, tarih: "" }];
    expect(indeksKur(tek).size).toBe(1);
  });

  it("mevcut olmayan id için undefined döner", () => {
    const idx = indeksKur(ornekKayitlar);
    expect(idx.get("YOK")).toBeUndefined();
  });
});

// =============================================================
// tekrarlayanlariBul
// =============================================================
describe("tekrarlayanlariBul", () => {
  it("tekrarlayan id'leri doğru raporlar", () => {
    const sonuc = tekrarlayanlariBul(ornekKayitlar);
    expect(sonuc).toHaveLength(1);
    expect(sonuc[0].id).toBe("A2");
    expect(sonuc[0].adet).toBe(2);
  });

  it("boş listede boş dizi döner", () => {
    expect(tekrarlayanlariBul([])).toEqual([]);
  });

  it("hiç tekrar yoksa boş dizi döner", () => {
    const benzersiz = [
      { id: "U1", kategori: "A", tutar: 100, tarih: "" },
      { id: "U2", kategori: "B", tutar: 200, tarih: "" },
    ];
    expect(tekrarlayanlariBul(benzersiz)).toEqual([]);
  });
});
