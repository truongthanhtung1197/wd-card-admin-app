import { useTranslations } from "next-intl";

import { ADMIN_ROLE } from "@/constant/admin.constant";

import * as Yup from "yup";

export const contactInformationSchema = (
  t: ReturnType<typeof useTranslations>,
  userRole?: string,
) => {
  const isSeoer = userRole === ADMIN_ROLE.SEOER;

  if (isSeoer) {
    return Yup.object().shape({
      telegramUsername: Yup.string()
        .matches(
          /^@?[a-zA-Z0-9_]{5,32}$/,
          t("ContactInformation.validation.telegramUsername.invalid"),
        )
        .required(t("ContactInformation.validation.telegramUsername.required")),
      phone: Yup.string()
        .optional()
        .test(
          "phone-format",
          t("ContactInformation.validation.phone.invalid"),
          function (value) {
            if (!value || value.length === 0) {
              return true; // Skip validation if empty
            }
            return /^[0-9]{10,11}$/.test(value);
          },
        ),
    });
  }

  return Yup.object().shape({
    telegramUsername: Yup.string()
      .matches(
        /^@?[a-zA-Z0-9_]{5,32}$/,
        t("ContactInformation.validation.telegramUsername.invalid"),
      )
      .required(t("ContactInformation.validation.telegramUsername.required")),
    phone: Yup.string()
      .matches(
        /^[0-9]{10,11}$/,
        t("ContactInformation.validation.phone.invalid"),
      )
      .required(t("ContactInformation.validation.phone.required")),
    bankName: Yup.string().optional(),
    bankNumber: Yup.string().optional(),
    bankNameInCard: Yup.string().optional(),
  });
};
