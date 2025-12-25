import { ErrorMessage } from "formik";

export const FErrorMessage = ({ name }: { name: string }) => (
  <div className="!text-sm !text-accent-error">
    <ErrorMessage name={name} className="mt-1" />
  </div>
);
