import { useCallback, useState } from "react";

const useVisibility = (initValue = false) => {
  const [isVisible, setIsVisible] = useState(initValue);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);
  const show = useCallback(() => setIsVisible(true), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return {
    isVisible,
    setIsVisible,
    show,
    hide,
    toggle,
  };
};

export default useVisibility;
