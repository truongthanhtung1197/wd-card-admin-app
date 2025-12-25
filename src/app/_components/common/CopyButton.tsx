import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { useTranslations } from "next-intl";

import { toast } from "@/app/_components/common/Toaster";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton = ({
  textToCopy,
  className = "inline-flex items-center text-blue-500 hover:text-blue-700 cursor-pointer",
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("CopyButton");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        toast.success(t("success"));

        // Reset state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        toast.error(t("error") + err);
      });
  };

  return (
    <span onClick={handleCopy} className={className}>
      {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
    </span>
  );
};

export default CopyButton;
