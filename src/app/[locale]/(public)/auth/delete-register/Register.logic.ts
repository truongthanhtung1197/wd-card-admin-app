import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { MySelectOption } from "@/app/_components/form/MySelect";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useRegisterMutation } from "@/store/Apis/Auth.api";

export enum BankNameOption {
  VietinBank = "VietinBank",
  Vietcombank = "Vietcombank",
  BIDV = "BIDV",
  Agribank = "Agribank",
  OCB = "OCB",
  MBBank = "MBBank",
  Techcombank = "Techcombank",
  ACB = "ACB",
  VPBank = "VPBank",
  TPBank = "TPBank",
  Sacombank = "Sacombank",
  HDBank = "HDBank",
  VietCapitalBank = "VietCapitalBank",
  SCB = "SCB",
  VIB = "VIB",
  SHB = "SHB",
  Eximbank = "Eximbank",
  MSB = "MSB",
  CAKE = "CAKE",
  Ubank = "Ubank",
  Timo = "Timo",
  ViettelMoney = "ViettelMoney",
  VNPTMoney = "VNPTMoney",
  SaigonBank = "SaigonBank",
  BacABank = "BacABank",
  PVcomBank = "PVcomBank",
  Oceanbank = "Oceanbank",
  NCB = "NCB",
  ShinhanBank = "ShinhanBank",
  ABBANK = "ABBANK",
  VietABank = "VietABank",
  NamABank = "NamABank",
  PGBank = "PGBank",
  VietBank = "VietBank",
  BaoVietBank = "BaoVietBank",
  SeABank = "SeABank",
  COOPBANK = "COOPBANK",
  LienVietPostBank = "LienVietPostBank",
  KienLongBank = "KienLongBank",
  KBank = "KBank",
  UnitedOverseas = "UnitedOverseas",
  StandardChartered = "StandardChartered",
  PublicBank = "PublicBank",
  Nonghyup = "Nonghyup",
  IndovinaBank = "IndovinaBank",
  IBKHCM = "IBKHCM",
  IBKHN = "IBKHN",
  VRB = "VRB",
  Woori = "Woori",
  KookminHN = "KookminHN",
  KookminHCM = "KookminHCM",
  HSBC = "HSBC",
  HongLeong = "HongLeong",
  GPBank = "GPBank",
  DongABank = "DongABank",
  DBSBank = "DBSBank",
  CIMB = "CIMB",
  CBBank = "CBBank",
  Citibank = "Citibank",
  KEBHanaHCM = "KEBHanaHCM",
  KEBHANAHN = "KEBHANAHN",
  MAFC = "MAFC",
  VBSP = "VBSP",
  BVBank = "BVBank",
}

export const useRegister = () => {
  const router = useLocaleRouter();
  const [register, { isLoading: loading, error }] = useRegisterMutation();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const bankOptions: MySelectOption[] = [
    ...Object.entries(BankNameOption).map(([key, value]) => ({
      key: value,
      label: value,
    })),
  ];

  const handleSubmit = useCallback(
    async (values: any) => {
      return;
      // try {
      //   const res: any = await register({
      //     username: values.username.trim(),
      //     password: values.password,
      //     telegramUsername: values.telegramUsername.trim(),
      //     phone: String(values.phone).trim(),
      //     email: values.email.trim(),
      //     bankName: values.bankName,
      //     bankNumber: String(values.bankNumber).trim(),
      //     bankNameInCard: values.bankNameInCard.trim(),
      //     usdt: values.usdt,
      //   } as any);
      //   apiResponseHandle({
      //     res,
      //     toastSuccessMessage: "Đăng ký thành công",
      //     onSuccess: () => {
      //       router.push(ROUTERS.LOGIN);
      //     },
      //   });
      // } catch (e: any) {
      //   toast.error("server lỗi");
      // }
    },
    [register, router],
  );

  return {
    handleSubmit,
    error,
    loading,
    bankOptions,
  };
};

export const getInitScreenByRole = (role: ADMIN_ROLE) => {};
