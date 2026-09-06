import { naifOrtak, hizliOrtak } from "./ortakEleman.js";

// 10.000 elemanlı iki liste oluştur
const N = 10_000;
const liste1 = Array.from({ length: N }, (_, i) => i);
const liste2 = Array.from({ length: N }, (_, i) => i + N / 2); // yarısı ortak

console.log("--- naifOrtak ölçümü ---");
console.time("naifOrtak");
const sonuc1 = naifOrtak(liste1, liste2);
console.timeEnd("naifOrtak");
console.log(`Ortak eleman sayısı: ${sonuc1.length}`);

console.log("\n--- hizliOrtak ölçümü ---");
console.time("hizliOrtak");
const sonuc2 = hizliOrtak(liste1, liste2);
console.timeEnd("hizliOrtak");
console.log(`Ortak eleman sayısı: ${sonuc2.length}`);
