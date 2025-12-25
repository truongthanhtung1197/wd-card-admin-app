"use client";


import { MyButton, PasswordInput, TextInput } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import FSelectInput from "@/app/_components/formik/FSelectInput";
import { LocaleLink } from "@/app/_components/LocaleLink";
import { ROUTERS } from "@/constant";
import { REGEX } from "@/constant/Regex.constant";

import { useRegister } from "./Register.logic";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required("Vui lòng nhập tên đăng nhập.")
    .trim()
    .matches(REGEX.USERNAME, "Tên đăng nhập chỉ được chứa chữ cái và số."),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu."),
  telegramUsername: Yup.string()
    .required("Vui lòng nhập tên Telegram.")
    .trim()
    .matches(REGEX.TELEGRAM, "Tên Telegram không hợp lệ."),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại.")
    .trim()
    .test("phone", "Số điện thoại không hợp lệ", (value) => {
      return REGEX.PHONE.test(value);
    }),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email.")
    .trim()
    .matches(REGEX.EMAIL, "Email không hợp lệ"),
  bankName: Yup.string().required("Vui lòng chọn ngân hàng.").trim(),
  bankNumber: Yup.string()
    .required("Vui lòng nhập số tài khoản.")
    .trim()
    .matches(/^[0-9]+$/, "stk ngân hàng chỉ được chứa số."),
  bankNameInCard: Yup.string()
    .required("Vui lòng nhập tên trên thẻ.")
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Tên trên thẻ chỉ được chứa chữ cái."),
  // usdt: Yup.string().required("Vui lòng nhập địa chỉ USDT."),
  // captcha: Yup.string().required("Vui lòng nhập mã bảo mật."),
});

const Register = () => {
  const { handleSubmit, error, loading, bankOptions } = useRegister();
  return (
    <div className="col items-center gap-6">
      <Text variant="h1" className="text-center">
        ĐĂNG KÝ
      </Text>

      <div className="text-sm">
        <span>Đã có tài khoản? </span>
        <LocaleLink href={ROUTERS.LOGIN}>
          <span className="font-semibold text-[#f39c12]">Đăng nhập</span>
        </LocaleLink>
      </div>

      <Formik
        initialValues={{
          username: "",
          password: "",
          telegramUsername: "",
          phone: "",
          email: "",
          bankName: "",
          bankNumber: "",
          bankNameInCard: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ validateField }) => {
          return (
            <Form autoComplete="off" className="col w-[600px] gap-6">
              {/* Loại tài khoản */}
              <div className="flex items-center gap-3 rounded-xl border border-[#f39c12] bg-[#fdf6ed] p-3 font-semibold">
                <div className="h-4 w-4 rounded-full border-4 border-[#f39c12]" />
                NGƯỜI BÁN HÀNG
              </div>

              {/* Các input */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput
                  type="text"
                  label="Tên đăng nhập"
                  name="username"
                  onBlur={() => {
                    validateField("username");
                  }}
                />
                <TextInput
                  onBlur={() => {
                    validateField("email");
                  }}
                  label="Email"
                  name="email"
                />
                <PasswordInput
                  onBlur={() => {
                    validateField("password");
                  }}
                  label="Mật khẩu"
                  name="password"
                />
                <PasswordInput
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  onBlur={() => {
                    validateField("confirmPassword");
                  }}
                />
                <TextInput
                  label="Tên (Telegram)"
                  name="telegramUsername"
                  type="text"
                  onBlur={() => {
                    validateField("telegramUsername");
                  }}
                />
                <TextInput
                  onBlur={() => {
                    validateField("phone");
                  }}
                  label="Số điện thoại"
                  name="phone"
                />
                <FSelectInput
                  options={bankOptions || []}
                  placeholder="Chọn ngân hàng"
                  name="bankName"
                  onBlur={() => {
                    validateField("bankName");
                  }}
                />
                <TextInput
                  label="Số tài khoản ngân hàng"
                  name="bankNumber"
                  onBlur={() => {
                    validateField("bankNumber");
                  }}
                />
                <TextInput
                  label="Tên trên thẻ ngân hàng"
                  name="bankNameInCard"
                  onBlur={() => {
                    validateField("bankNameInCard");
                  }}
                />
                <TextInput label="USDT (TRC20)" name="usdt" />
              </div>

              {/* Button submit */}
              <MyButton
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="mt-2"
              >
                TẠO TÀI KHOẢN
              </MyButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
