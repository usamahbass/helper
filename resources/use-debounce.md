---
title: Use Debounce
spoiler: Menunda eksekusi berulang sebuah fungsi dan menunggu sampai ada kondisi selama beberapa saat.
language: React
coder: usamahbass
usage: Berfungsi untuk menunda eksekusi berulang sebuah fungsi dan menunggu sampai ada kondisi selama beberapa saat.
---

```javascript
import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [value, setValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setValue(value);
    }, delay);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [value, delay]);

  return value;
};
```
