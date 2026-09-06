import { describe, it, expect } from "vitest";
import { naifOrtak, hizliOrtak } from "../src/ortakEleman.js";

// Her iki fonksiyon da aynı davranış testlerinden geçmelidir.
// Fonksiyon adını parametre alarak tek bir test seti tanımlıyoruz.
const cozumler = [
  { ad: "naifOrtak", fn: naifOrtak },
  { ad: "hizliOrtak", fn: hizliOrtak },
];

cozumler.forEach(({ ad, fn }) => {
  describe(ad, () => {
    it("ortak elemanları döner", () => {
      const sonuc = fn([1, 2, 3, 4], [3, 4, 5, 6]);
      expect(sonuc.sort()).toEqual([3, 4]);
    });

    it("ortak eleman yoksa boş dizi döner", () => {
      expect(fn([1, 2], [3, 4])).toEqual([]);
    });

    it("boş liste1 ile boş dizi döner", () => {
      expect(fn([], [1, 2, 3])).toEqual([]);
    });

    it("boş liste2 ile boş dizi döner", () => {
      expect(fn([1, 2, 3], [])).toEqual([]);
    });

    it("her iki liste boşsa boş dizi döner", () => {
      expect(fn([], [])).toEqual([]);
    });

    it("string elemanlarla çalışır", () => {
      const sonuc = fn(["a", "b", "c"], ["b", "c", "d"]);
      expect(sonuc.sort()).toEqual(["b", "c"]);
    });

    it("girdi listelerini mutate etmez", () => {
      const l1 = [1, 2, 3];
      const l2 = [2, 3, 4];
      const l1Kopya = [...l1];
      const l2Kopya = [...l2];
      fn(l1, l2);
      expect(l1).toEqual(l1Kopya);
      expect(l2).toEqual(l2Kopya);
    });
  });
});
