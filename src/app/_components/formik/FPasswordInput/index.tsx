import React, { memo, useState } from "react";

import { EyeFilledIcon } from "../../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../icons/EyeSlashFilledIcon";
import TextInput, { MyInputProps } from "../FTextInput";
import FTextInputMask, { MyInputMaskProps } from "../FTextInputMask";

type PropsType = MyInputProps &
  MyInputMaskProps & {
    inputType?: "inputMask" | "normal";
  };

const PasswordInput = memo(({ inputType = "normal", ...props }: PropsType) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return inputType === "normal" ? (
    <TextInput
      {...props}
      endContent={
        <button
          className="h-[100%] focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  ) : (
    <FTextInputMask
      {...props}
      type={isVisible ? "text" : "password"}
      endContent={
        <button
          className="h-[100%] focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
        </button>
      }
    />
  );
});

export default PasswordInput;
