// hooks/useCookie.ts
import { useState } from "react";

import Cookies from "js-cookie";

const useCookie = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = Cookies.get(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      Cookies.set(key, value, { expires: 7 }); // cookie expires in 7 days
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useCookie;
