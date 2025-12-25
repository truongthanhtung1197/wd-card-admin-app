import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { MyButton } from "@/app/_components";
import MyCard from "@/app/_components/common/MyCard";
import { Service } from "@/model/Partner.model";
import {
  ORDER_STATUS,
  useUpdateOrderStatusMutation,
  useUploadFileMutation,
} from "@/store/Apis/Order.api";
import { apiResponseHandle } from "@/utils/common.util";
import { Input } from "@nextui-org/react";

import MyModal from "../../common/MyModal";
import { toast } from "../../common/Toaster";

import { Form, Formik } from "formik";

export default function ModalEditOrder({
  isVisibleCreateDomain,
  hideEditOrder,
  onSuccess,
  editService,
}: {
  isVisibleCreateDomain: boolean;
  hideEditOrder: () => void;
  onSuccess?: () => void;
  editService?: Service;
}) {
  const t = useTranslations("ModalEditOrder");
  const [file, setFile] = useState<File | null>(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  
  useEffect(() => {
    setFile(null);
  }, [editService, isVisibleCreateDomain]);

  // API hooks
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();
  const [updateOrderStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error(t("fileInput.error"));
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleConfirm = async () => {
    if (!file) {
      toast.error(t("fileInput.error"));
      return;
    }

    setShowConfirmPopup(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const fileUploadResponse: any = await uploadFile(formData);
      apiResponseHandle({
        res: fileUploadResponse,
        onSuccess: async () => {
          const res = await updateOrderStatus({
            id: String(editService?.id),
            status: ORDER_STATUS.COMPLETED_BY_PARTNER,
            fileId: fileUploadResponse?.data?.fileId,
          });

          apiResponseHandle({
            res: res,
            onSuccess: () => {
              onSuccess?.();
              hideEditOrder();
            },
            toastSuccessMessage: t("messages.updateSuccess"),
          });
        },
      });
    } catch (error) {
      console.error("Error uploading file or updating status:", error);
    }
  };

  return (
    <>
      <MyModal
        size="4xl"
        isOpen={isVisibleCreateDomain}
        onClose={hideEditOrder}
        header={t("title")}
        body={
          <Formik
            initialValues={{ file: "" }}
            onSubmit={() => {}}
            enableReinitialize={true}
          >
            {() => (
              <Form autoComplete="off" className="col w-full gap-6">
                <MyCard className="border-brand-primary">
                  <div className="flex flex-col gap-4">
                    <Input
                      type="file"
                      label={t("fileInput.label")}
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg"
                      isDisabled={!!file}
                      className={file ? "cursor-not-allowed opacity-80" : ""}
                    />

                    {file && (
                      <div className="relative w-[200px]">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Selected file"
                          width={200}
                          height={200}
                          className="rounded-md object-cover shadow-md"
                        />
                        <button
                          onClick={() => setFile(null)}
                          className="absolute right-1 top-1 rounded-full bg-white p-1 shadow hover:bg-red-100"
                          type="button"
                        >
                          <MdClose className="h-5 w-5 text-gray-500  hover:text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </MyCard>
              </Form>
            )}
          </Formik>
        }
        footer={
          <div className="flex justify-end gap-3">
            <MyButton bType="neutral" bSize="small" onClick={hideEditOrder}>
              {t("buttons.cancel")}
            </MyButton>
            <MyButton
              bSize="small"
              onClick={handleFileUpload}
              isDisabled={uploading || updating}
              isLoading={uploading || updating}
            >
              {t("buttons.confirm")}
            </MyButton>
          </div>
        }
      />

      {showConfirmPopup && (
        <MyModal
          size="sm"
          isOpen={showConfirmPopup}
          onClose={() => setShowConfirmPopup(false)}
          header={t("confirmPopup.title")}
          body={t("confirmPopup.message")}
          footer={
            <div className="flex justify-end gap-3">
              <MyButton
                bType="neutral"
                bSize="small"
                onClick={() => setShowConfirmPopup(false)}
              >
                {t("buttons.cancel")}
              </MyButton>
              <MyButton bSize="small" onClick={handleConfirm}>
                {t("buttons.confirm")}
              </MyButton>
            </div>
          }
        />
      )}
    </>
  );
}
