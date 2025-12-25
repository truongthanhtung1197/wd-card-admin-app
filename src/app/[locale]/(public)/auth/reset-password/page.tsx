"use client";

import { MyButton, PasswordInput } from "@/app/_components";
import { Alert, AlertDescription } from "@/app/_components/common/Alert";
import Text from "@/app/_components/common/Text";
import ErrorTickIcon from "@/app/_components/icons/ErrorTickIcon";
import LogoAuthIcon from "@/app/_components/icons/LogoAuthIcon";
import SuccessTickIcon from "@/app/_components/icons/SuccessTickIcon";
import WarningIcon from "@/app/_components/icons/WarningIcon";
import { Divider } from "@nextui-org/react";

import { useLogic } from "./ResetPassword.logic";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const NewPasswordSchema = Yup.object().shape({
  password: Yup.string().min(12).required("Please enter your password."),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Password and Confirm Password did not match.",
    )
    .required("Please enter your confirm password."),
});

const NewPassword = () => {
  const {
    handleSubmit,
    loading,
    error,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    hasMinLength,
    hasNumber,
  } = useLogic();

  return (
    <div className="col w-[280px] gap-8">
      <div className="flex justify-center">
        <LogoAuthIcon />
      </div>
      <Text variant="h2" className="text-center">
        NEW PASSWORD
      </Text>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={NewPasswordSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ touched, values, validateForm }) => {
          return (
            <Form autoComplete="off" className="col gap-8">
              <div className="col gap-3">
                <div className="col gap-2">
                  <PasswordInput
                    label="Password"
                    name="password"
                    className="w-full"
                  />
                  {touched?.password && values?.password && (
                    <div
                      className={`col gap-3 rounded-xl border border-neutral-stroke-light bg-[#fff] p-4`}
                    >
                      <Text variant="body3-emphasized">
                        Password must contain:
                      </Text>
                      <Divider className="!my-0 bg-neutral-stroke-light" />
                      <div className="flex items-center gap-2">
                        {hasUpperCase(values.password) ? (
                          <SuccessTickIcon />
                        ) : (
                          <ErrorTickIcon />
                        )}{" "}
                        <span
                          className={`text-sm font-medium ${hasUpperCase(values.password) && "text-[#A3A3A3]"}`}
                        >
                          Uppercase character
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasLowerCase(values.password) ? (
                          <SuccessTickIcon />
                        ) : (
                          <ErrorTickIcon />
                        )}{" "}
                        <span
                          className={`text-sm font-medium ${hasLowerCase(values.password) && "text-[#A3A3A3]"}`}
                        >
                          Lowercase character
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasNumber(values.password) ? (
                          <SuccessTickIcon />
                        ) : (
                          <ErrorTickIcon />
                        )}{" "}
                        <span
                          className={`text-sm font-medium ${hasNumber(values.password) && "text-[#A3A3A3]"}`}
                        >
                          Number
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasSpecialChar(values.password) ? (
                          <SuccessTickIcon />
                        ) : (
                          <ErrorTickIcon />
                        )}{" "}
                        <span
                          className={`text-sm font-medium ${hasSpecialChar(values.password) && "text-[#A3A3A3]"}`}
                        >
                          Special character
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasMinLength(values.password) ? (
                          <SuccessTickIcon />
                        ) : (
                          <ErrorTickIcon />
                        )}{" "}
                        <span
                          className={`text-sm font-medium ${hasMinLength(values.password) && "text-[#A3A3A3]"}`}
                        >
                          At least 12 characters
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <PasswordInput
                  label="Confirm password"
                  name="confirmPassword"
                  className="w-full"
                />
                {error && (
                  <Alert variant="destructive">
                    <div>
                      <WarningIcon />
                    </div>
                    <AlertDescription>
                      {(error as any)?.data?.error?.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <MyButton
                type="submit"
                onClick={() => validateForm()}
                disabled={loading}
                isLoading={loading}
                className="w-full"
              >
                Reset password
              </MyButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewPassword;
