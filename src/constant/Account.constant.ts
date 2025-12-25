export enum METHOD_2FA {
  OTP = "verification_code",
  SECURITY_QUESTION = "security_question",
}

export const METHOD_2FA_OPTIONS = [
  {
    label: "Verification code",
    key: METHOD_2FA.OTP,
  },
  {
    label: "Security questions",
    key: METHOD_2FA.SECURITY_QUESTION,
  },
];
