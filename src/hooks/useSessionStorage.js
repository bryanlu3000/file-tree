import { useState, useEffect } from "react";

export const useSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
