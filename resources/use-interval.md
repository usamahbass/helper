---
title: Use Interval
spoiler: Menunda eksekusi berulang sebuah fungsi dan menunggu sampai ada kondisi selama beberapa saat.
language: React
coder: usamahbass
usage: Berfungsi untuk menunda eksekusi berulang sebuah fungsi dan menunggu sampai ada kondisi selama beberapa saat.
---

```javascript
import { useState, useEffect } from "react";

export default (handler, interval) => {
  const [intervalId, setIntervalId] = useState();
  useEffect(() => {
    // add some interval time.
    const id = setInterval(handler, interval);
    setIntervalId(id);
    // return clear interval
    return () => clearInterval(id);
  }, []);
  return () => clearInterval(intervalId);
};
```