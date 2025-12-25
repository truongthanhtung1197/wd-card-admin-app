import { useEffect, useState } from "react";

// Custom hook to use session storage with TypeScript
function useSessionStorage<T>(key: string, initialValue: T) {
  // Get stored value from session storage
  const getStoredValue = (): T => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Effect to update session storage whenever the state changes
  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(storedValue);
      window.sessionStorage.setItem(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  // Function to remove the key from session storage
  const removeStoredValue = () => {
    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing sessionStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setStoredValue, removeStoredValue] as const;
}

export default useSessionStorage;
