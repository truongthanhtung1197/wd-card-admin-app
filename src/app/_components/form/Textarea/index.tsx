import React, { memo } from "react";

import { Textarea, TextAreaProps } from "@nextui-org/input";

interface MyTextareaProps extends TextAreaProps {
  className?: string;
}

function MyTextarea({ className = "", label, placeholder, ...textareaProps }: MyTextareaProps) {
  return (
    <div className={className}>
      <Textarea
        className="w-full"
        label={label}
        placeholder={placeholder}
        {...textareaProps}
      />
    </div>
  );
}

export default memo(MyTextarea);
