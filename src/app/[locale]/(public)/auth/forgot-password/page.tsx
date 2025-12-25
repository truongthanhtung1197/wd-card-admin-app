/* eslint-disable react/no-unescaped-entities */
"use client";


import { MyButton, TextInput } from "@/app/_components";
import { Alert, AlertDescription } from "@/app/_components/common/Alert";
import Text from "@/app/_components/common/Text";
import LogoAuthIcon from "@/app/_components/icons/LogoAuthIcon";
import WarningIcon from "@/app/_components/icons/WarningIcon";
import { LocaleLink } from "@/app/_components/LocaleLink";
import { ROUTERS } from "@/constant";

import { useLogic } from "./ForgotPassword.logic";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format. Please enter a valid email address.")
    .required("Please enter your email."),
});

const ForgotPassword = () => {
  const {
    handleSubmit,
    error,
    loading,
    isForgotPasswordSuccess,
    handleResentCode,
  } = useLogic();

  return (
    <div className="col w-[280px] gap-8">
      <div className="flex justify-center">
        <LogoAuthIcon />
      </div>
      <Text variant="h2" className="text-center">
        FORGOT PASSWORD
      </Text>
      {isForgotPasswordSuccess ? (
        <>
          <Text variant="body2-regular" className="text-center">
            We've sent an email to reset your password. Please check your inbox.
          </Text>
          <Text variant="body2-regular" className="text-center">
            Don’t receive email?{" "}
            <Text
              variant="body2-link"
              onClick={() => handleResentCode()}
              className="ml-1 inline px-0"
            >
              Resend
            </Text>
          </Text>
          <div>
            <div className="mb-4 h-px w-full bg-neutral-stroke-bold" />
            <Text variant="body2-regular" className="text-center">
              If you don't receive the email within a few minutes, check your
              spam folder.
            </Text>
          </div>
        </>
      ) : (
        <>
          <Text variant="body2-regular" className="text-center">
            We will send you instructions on how to reset your password by
            email.{" "}
          </Text>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ validateForm }) => {
              return (
                <Form autoComplete="off" className="col gap-8">
                  <div className="col gap-3">
                    <TextInput
                      label="Email"
                      type="email"
                      name="email"
                      className="w-full"
                    />
                    {error && (
                      <Alert variant="destructive" className="mt-4">
                        <div>
                          <WarningIcon />
                        </div>
                        <AlertDescription>
                          {(error as any)?.data?.error?.message ||
                            "Sent link to reset password fail. Please try again!!!"}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <MyButton
                    type="submit"
                    disabled={loading}
                    isLoading={loading}
                    onClick={() => validateForm()}
                    className="w-full"
                  >
                    Send reset email
                  </MyButton>
                  <LocaleLink href={ROUTERS.LOGIN} className="mx-auto w-fit">
                    <Text variant="body2-link">Back to Log in</Text>
                  </LocaleLink>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
