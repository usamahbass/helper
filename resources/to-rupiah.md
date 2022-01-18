---
title: To Rupiah
spoiler: Format angka menjadi format uang rupiah
language: Javascript
coder: usamahbass
usage: Memformat angka menjadi format mata uang rupiah
---

```javascript
const toRupiah = (int) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimunFractionDigits: 0
  }).format(int)
}
```
