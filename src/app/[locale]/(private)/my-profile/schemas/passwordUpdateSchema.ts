import { useTranslations } from "next-intl";

import * as Yup from "yup";

export const usePasswordUpdateSchema = () => {
  const t = useTranslations("PasswordUpdate");

  return Yup.object().shape({
    oldPassword: Yup.string().required(t("oldPassword.required")),
    newPassword: Yup.string()
      .min(8, t("newPassword.minLength"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        t("newPassword.pattern")
      )
      .required(t("newPassword.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("confirmPassword.match"))
      .required(t("confirmPassword.required")),
  });
}; 