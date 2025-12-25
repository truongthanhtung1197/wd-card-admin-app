import { useTranslations } from "next-intl";

import { MySelectOption } from "@/app/_components/form/MySelect";
import { BankNameOption } from "@/app/[locale]/(public)/auth/delete-register/Register.logic";
import { Admin } from "@/model/Admin.mode";
import { GlobalDispatch } from "@/store";
import { useEditAdminByIdMutation } from "@/store/Apis/Admin.api";
import { useUploadFileMutation } from "@/store/Apis/Order.api";
import { AuthActions } from "@/store/Auth/Auth.redux";
import { apiResponseHandle, validateImageFile } from "@/utils/common.util";

import Cookies from "js-cookie";
import { toast } from "sonner";

export const useLogicEditProfile = (user: any) => {
  const t = useTranslations("MyProfile");
  const [editProfile, { isLoading: loading }] = useEditAdminByIdMutation();
  const userId = user?.id;

  const handleUpdateLocalStorage = (admin: Admin) => {
    if (!admin) return;

    // update to redux
    GlobalDispatch(AuthActions.setAdmin(admin));

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    GlobalDispatch(
      AuthActions.verifyOTPSuccess({
        data: {
          admin: admin as Admin,
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        },
      }),
    );
  };

  const bankOptions: MySelectOption[] = [
    ...Object.entries(BankNameOption).map(([_, value]) => ({
      key: value,
      label: value,
    })),
  ];

  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    validateImageFile(file, async (validFile) => {
      try {
        const formData = new FormData();
        formData.append("file", validFile);
        const response = await uploadFile(formData);

        const res = await editProfile({
          id: String(userId) || "",
          data: {
            fileId: String(response?.data?.fileId) || "",
          },
        });

        const adminRes = res?.data?.data as Admin;

        apiResponseHandle({
          res,
          onSuccess: () => {
            toast.success(t("messages.avatarUpdateSuccess"));
            handleUpdateLocalStorage(adminRes);
          },
          toastSuccessMessage: t("messages.avatarUpdateSuccess"),
        });
      } catch (error) {
        toast.error(t("messages.avatarUpdateFailed"));
      }
    });
  };

  return {
    editProfile,
    bankOptions,
    handleFileChange,
    isLoading: loading || uploading,
  };
};
