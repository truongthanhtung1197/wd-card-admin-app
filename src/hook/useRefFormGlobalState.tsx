import { useCallback, useEffect } from "react";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GetPathParams {
  refForm: any;
  setRefForm: (formRef: any) => void;
}

const useRefFormStore = create<GetPathParams>()(
  devtools(
    (set) => ({
      refForm: {},
      setRefForm: (formRef: any) =>
        set((state) => ({
          refForm: formRef,
        })),
    }),
    { name: "refFrom" },
  ),
);

export const useRefFormGlobalState = () => {
  const { refForm, setRefForm } = useRefFormStore();
  const removeRefForm = useCallback(() => {
    setRefForm(null);
  }, [setRefForm]);

  useEffect(() => {
    return () => {
      removeRefForm();
    };
  }, []);

  return { refForm, setRefForm, removeRefForm };
};
