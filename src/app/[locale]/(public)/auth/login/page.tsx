"use client";

import { useTranslations } from "next-intl";

import { MyButton, PasswordInput, TextInput } from "@/app/_components";
import Text from "@/app/_components/common/Text";

import { useLogic } from "./Login.logic";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { handleSubmit, error, loading } = useLogic();
  const t = useTranslations("Login");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t("email.invalid")).required(t("email.required")),
    password: Yup.string().required(t("password.required")),
  });

  return (
    <div className="col items-center gap-8">
      <Text variant="h2" className="text-center">
        {t("title")}
      </Text>

      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={LoginSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          return (
            <Form autoComplete="off" className="col w-[320px] gap-8">
              <div className="col gap-3">
                <TextInput
                  label={t("email.label")}
                  type="email"
                  name="email"
                  className="w-full"
                />
                <div className="relative">
                  <PasswordInput
                    label={t("password.label")}
                    name="password"
                    className="w-full"
                  />
                  {/* <LocaleLink
                    href={ROUTERS.FORGOT_PASSWORD}
                    className="text-[#f39c12 absolute -bottom-[60%] right-0 text-sm font-semibold "
                  >
                    Quên mật khẩu?
                  </LocaleLink> */}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <Field type="checkbox" name="remember" className="h-4 w-4" />
                <span>Remember me</span>
              </label>

              <MyButton
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="mt-8 rounded-full py-3 text-lg font-bold"
              >
                {t("submit")}
              </MyButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
