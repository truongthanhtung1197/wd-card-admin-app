import { useState } from "react";

import { validateImageFile } from "@/utils/common.util";
import { Spinner } from "@nextui-org/react";

import { FileUploadRef } from "../../common/FileUpload";
import PreviewImage from "../../common/PreviewImage";
import CameraIcon from "../../icons/CameraIcon";
import SendMessageIcon from "../../icons/SendMessageIcon";
import MyTextarea from "../Textarea";

import { toast } from "sonner";

interface CommentInputProps {
    onSubmit: (file: File | null) => void;
    disabled?: boolean;
    fileUploadRef: React.RefObject<FileUploadRef>;
}

export default function CommentInput({ onSubmit, disabled, fileUploadRef }: CommentInputProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        validateImageFile(file, async (validFile) => {
            try {
                setFile(validFile);
            } catch (error) {
              toast.error("Tải ảnh lên thất bại");
            }
        });
    }
    
  return (
    <div className="relative">
        <MyTextarea  />
          <div className="relative z-2 bottom-[5px] right-0 flex items-center justify-between bg-[#f4f4f5] w-full px-[11px] pb-[10px]">
                <span className="cursor-pointer relative">
                  <CameraIcon className="cursor-pointer" />
                  <input disabled={disabled} type="file" onChange={handleFileChange} className="cursor-pointer opacity-0 absolute top-0 left-0 w-full h-full" />
                </span>
            {
                disabled ? <Spinner /> : <span className="cursor-pointer" onClick={() => onSubmit(file)}><SendMessageIcon /></span>
            }
          </div>
          <PreviewImage file={file} setFile={setFile} ref={fileUploadRef} />
    </div>
  );
}