'use client';

import React, { forwardRef, useImperativeHandle,useState } from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Input } from '@nextui-org/react';

interface FileUploadProps {
  onChange?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  className?: string;
  disabled?: boolean;
  initialPreview?: string;
}

export interface FileUploadRef {
  handleRemoveFile: () => void;
}

const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(({
  onChange,
  accept = 'image/png, image/jpeg',
  maxSize = 5, // 5MB default
  label,
  className = '',
  disabled = false,
  initialPreview,
}, ref) => {
  const t = useTranslations('FileUpload');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      onChange?.(null);
      return;
    }

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(t('errors.fileSizeExceeded', { maxSize }));
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    onChange?.(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    onChange?.(null);
  };

  useImperativeHandle(ref, () => ({
    handleRemoveFile
  }));

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Input
        key={file ? 'has-file' : 'no-file'}
        type="file"
        label={label || t('defaultLabel')}
        onChange={handleFileChange}
        accept={accept}
        isDisabled={disabled || !!file}
        className={file ? "cursor-not-allowed opacity-80" : ""}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {preview && (
        <div className="relative w-[200px]">
          <Image
            src={preview}
            alt={t('previewAlt')}
            width={200}
            height={200}
            className="rounded-md object-cover shadow-md"
          />
          <button
            onClick={handleRemoveFile}
            className="absolute right-1 top-1 rounded-full bg-white p-1 shadow hover:bg-red-100"
            type="button"
            disabled={disabled}
            aria-label={t('removeFile')}
          >
            <MdClose className="h-5 w-5 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
});

export default FileUpload; 