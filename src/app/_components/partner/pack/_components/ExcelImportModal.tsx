"use client";
import React, { useRef, useState } from "react";

import { SERVICE_TYPE_PACK } from "@/constant/service.constant";
import { useImportServiceMutation } from "@/store/Apis/Service.api";
import { apiResponseHandle } from "@/utils/common.util";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import MyButton from "../../../common/MyButton";
import {
  EXCEL_HEADERS,
  type PackExcelData,
  useExcelImport,
} from "../hooks/useExcelImport";

import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (data: PackExcelData[]) => void;
  setIsImporting: (data: boolean) => void;
}

const ExcelImportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onImportSuccess,
  setIsImporting,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<PackExcelData[] | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    loading,
    validationErrors,
    downloadTemplate,
    handleFileImport,
    setValidationErrors,
  } = useExcelImport();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Kiểm tra định dạng file - chỉ Excel
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (
        !allowedTypes.includes(file.type) &&
        !file.name.toLowerCase().endsWith(".xlsx") &&
        !file.name.toLowerCase().endsWith(".xls")
      ) {
        toast.error("Vui lòng chọn file Excel (.xlsx hoặc .xls)");
        return;
      }

      setSelectedFile(file);
      setValidationErrors([]);
    }
  };
  const [importService, { isLoading: loadingImport }] =
    useImportServiceMutation();
  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Vui lòng chọn file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("typePack", SERVICE_TYPE_PACK.PACK);
    const res = await importService(formData);

    apiResponseHandle({
      res,
      toastSuccessMessage:
        "Dữ liệu của bạn đang được xử lí trong nền. Bạn vui lòng chờ hoặc quay lại hoặc làm mới trang sau vài phút!",
      onSuccess() {
        onClose();
        setIsImporting(true);
      },
    });
  };

  const handlePreviewOk = () => {
    if (previewData) {
      onImportSuccess(previewData);
      setPreviewData(null);
      setShowPreview(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setValidationErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showPreview}
        onClose={handleClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Import Pack từ Excel</h3>
            <p className="text-sm text-gray-600">
              Tải lên file Excel chứa thông tin pack với dropdown validation
            </p>
          </ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              {/* Download template */}
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  1. Tải xuống file mẫu
                </h4>
                <p className="mb-3 text-sm text-gray-600">
                  Tải xuống file Excel mẫu với dropdown validation hoạt động
                </p>
                <MyButton
                  bType="secondary"
                  bSize="small"
                  onClick={downloadTemplate}
                >
                  Tải xuống file mẫu
                </MyButton>
              </div>

              {/* File upload */}
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  2. Chọn file để import
                </h4>
                <p className="mb-3 text-sm text-gray-600">
                  Chọn file Excel (.xlsx, .xls) chứa dữ liệu pack
                </p>

                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <MyButton
                    bType="secondary"
                    bSize="small"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Chọn file
                  </MyButton>
                  {selectedFile && (
                    <span className="text-sm text-gray-600">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Required fields info */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-medium text-blue-900">
                  Lưu ý quan trọng
                </h4>
                <p className="mb-3 text-sm text-yellow-800">
                  Không được thay đổi format của file mẫu
                </p>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>
                    • <strong>Tên Pack</strong>, <strong>Loại dịch vụ</strong>,{" "}
                    <strong>Giá</strong> và <strong>Demo URL</strong> là bắt
                    buộc
                  </li>
                  <li>• Loại dịch vụ: TRAFFIC, ENTITY, BACKLINK, TOOL</li>
                  <li>• Giá và giảm giá: nhập số tiền VND (phải {">"} 0)</li>
                  <li>• Ưu đãi kèm theo: ngăn cách bằng dấu | (pipe)</li>
                  <li>• Hiển thị trên market: true/false</li>
                  <li>• Demo URL phải đúng định dạng (http/https)</li>
                </ul>
              </div>

              {/* Validation errors */}
              {validationErrors.length > 0 && (
                <div className="max-h-60 overflow-y-auto rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="mb-2 font-medium text-red-900">
                    Có {validationErrors.length} lỗi trong file:
                  </h4>
                  <ul className="space-y-1 text-sm text-red-800">
                    {validationErrors.slice(0, 10).map((error, index) => (
                      <li key={index}>
                        • Dòng {error.row}: {error.message}
                      </li>
                    ))}
                    {validationErrors.length > 10 && (
                      <li className="text-red-600">
                        ... và {validationErrors.length - 10} lỗi khác
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <MyButton bType="secondary" onClick={handleClose}>
              Hủy
            </MyButton>
            <MyButton
              bType="primary"
              onClick={handleImport}
              disabled={!selectedFile || loadingImport}
              isLoading={loadingImport}
              isDisabled={loadingImport}
            >
              {loadingImport ? "Đang xử lý..." : "Import"}
            </MyButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Preview Table Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        size="5xl"
      >
        <ModalContent>
          <ModalHeader>Preview dữ liệu import</ModalHeader>
          <ModalBody>
            <div className="max-h-[60vh] overflow-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    {EXCEL_HEADERS.map((h) => (
                      <th
                        key={h.key}
                        className="border bg-gray-100 px-2 py-1 text-xs"
                      >
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData?.map((row, idx) => (
                    <tr key={idx}>
                      {EXCEL_HEADERS.map((h) => (
                        <td key={h.key} className="border px-2 py-1 text-xs">
                          {(row as any)[h.key] !== undefined
                            ? String((row as any)[h.key])
                            : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <MyButton bType="primary" onClick={handlePreviewOk}>
              OK
            </MyButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExcelImportModal;
