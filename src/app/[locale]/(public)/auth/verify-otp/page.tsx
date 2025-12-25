"use client";

import { MyButton } from "@/app/_components";
import { Alert, AlertDescription } from "@/app/_components/common/Alert";
import { OTPInput } from "@/app/_components/form/OTPInput";
import LogoAuthIcon from "@/app/_components/icons/LogoAuthIcon";
import WarningIcon from "@/app/_components/icons/WarningIcon";

import { useLogic } from "./VerifyOTP.logic";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  otpCode: Yup.string(),
});

const VerifyOtp = () => {
  const {
    handleSubmit,
    error,
    loading,
    email,
    handleResentCode,
    resendLoading,
  } = useLogic();

  return (
    <div className="col w-[280px] gap-8">
      <div className="flex justify-center">
        <LogoAuthIcon />
      </div>
      <h3 className="text-center text-[32px]/[36px] font-bold">
        VERIFY <br /> YOUR ACCOUNT
      </h3>
      <Formik
        initialValues={{
          otpCode: " ",
        }}
        enableReinitialize
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, resetForm, values }) => {
          return (
            <Form autoComplete="off" className="col gap-8">
              <p className="text-center text-lg font-medium">
                Enter the verification code sent to your email
                <strong className="inline"> {email}</strong>
              </p>
              <div className="flex justify-center">
                <OTPInput
                  onChange={(otpCode) => setFieldValue("otpCode", otpCode)}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <div>
                    <WarningIcon />
                  </div>
                  <AlertDescription>
                    {(error as any)?.data?.error?.message === "OTP code invalid"
                      ? "The validation code is incorrect. Please check and try again."
                      : (error as any)?.data?.error?.message}
                  </AlertDescription>
                </Alert>
              )}

              <MyButton
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="font-[18px]/[24px] w-full !bg-brand-primary font-medium"
              >
                Complete Login
              </MyButton>

              <p className="text-center text-lg font-medium">
                Didn&apos;t receive a code?{" "}
                <button
                  type="button"
                  className="text-[#006EE5]"
                  onClick={() => {
                    handleResentCode();
                    resetForm();
                  }}
                >
                  Resend
                </button>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default VerifyOtp;
