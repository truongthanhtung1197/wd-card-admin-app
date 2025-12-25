import { memo } from "react";

import { cn } from "@/utils/common.util";

import WarningIcon from "../../icons/WarningIcon";
import WarningIcon2 from "../../icons/WarningIcon2";
import Text from "../Text";

import { motion } from "framer-motion";

const ShowMessage = ({
  className,
  text = "",
  variant = "error",
}: {
  className?: string;
  text?: string;
  variant?: "error" | "warning";
}) => {
  return (
    text && (
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex items-start gap-2 rounded-lg border px-2 py-1",
          variant === "error"
            ? "border-accent-error bg-[#FFF0DC]"
            : "border-accent-warning bg-[#FFF5E6]",
          className,
        )}
      >
        <div className="relative mt-[4px] h-max w-max">
          {variant === "error" ? (
            <WarningIcon size="13" />
          ) : (
            <WarningIcon2 width={13} height={11} />
          )}
        </div>
        <Text
          className={cn(variant === "error" ? "text-accent-error" : "")}
          variant="body2-regular"
        >
          {text}
        </Text>
      </motion.div>
    )
  );
};

export default memo(ShowMessage);
