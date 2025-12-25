"use client";


import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import LogoAuthIcon from "@/app/_components/icons/LogoAuthIcon";
import { LocaleLink } from "@/app/_components/LocaleLink";
import { ROUTERS } from "@/constant";

const NewPasswordSuccess = () => {
  return (
    <div className="col w-[280px] gap-8">
      <div className="flex justify-center">
        <LogoAuthIcon />
      </div>
      <Text variant="h2" className="text-center">
        NEW PASSWORD
      </Text>
      <p className="mx-auto w-[80%] text-center text-lg font-medium">
        Your password has been successfully reset
      </p>
      <LocaleLink href={ROUTERS.LOGIN}>
        <MyButton type="submit" className="w-full">
          Back to Log in
        </MyButton>
      </LocaleLink>
    </div>
  );
};

export default NewPasswordSuccess;
