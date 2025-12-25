import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

import { FileUploadRef } from "./FileUpload";

interface PreviewImageProps {
   file: File | null;
    setFile: (file: File | null) => void;
}

  const PreviewImage = forwardRef<FileUploadRef, PreviewImageProps>(({
    file, setFile
  }, ref) => {

    const [preview, setPreview] = useState<string | null>(file ? URL.createObjectURL(file) : null);
   
    const handleRemoveFile = () => {
        setPreview(null);
        setFile(null);
    }

    useEffect(() => {
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }, [file]);
  
    useImperativeHandle(ref, () => ({
      handleRemoveFile
    }));
    
  return (
    <div>
     {preview && (
        <div className="relative w-[100px] h-[100px] mt-[10px]">
          <Image
            src={preview}
            alt="Selected file"
            width={200}
            height={200}
            className="rounded-md object-contain shadow-md w-[100px] h-[100px]"
          />
          <button
            onClick={handleRemoveFile}
            className="absolute right-1 top-1 rounded-full bg-white p-1 shadow hover:bg-red-100"
            type="button"
          >
            <MdClose className="h-5 w-5 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      )}    
    </div>
  );
})

export default PreviewImage;