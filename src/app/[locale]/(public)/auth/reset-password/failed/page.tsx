"use client";


import { MyButton } from "@/app/_components";
import Text from "@/app/_components/common/Text";
import LogoAuthIcon from "@/app/_components/icons/LogoAuthIcon";
import { LocaleLink } from "@/app/_components/LocaleLink";
import { ROUTERS } from "@/constant";

const NewPasswordFailed = () => {
  return (
    <div className="col w-[280px] gap-8">
      <div className="flex justify-center">
        <LogoAuthIcon />
      </div>
      <Text variant="h2" className="text-center">
        NEW PASSWORD
      </Text>
      <Text variant="h4" className="uppercase">
        Password Reset Unsuccessful
      </Text>
      <div>
        <p className="mx-auto mb-4 text-center text-lg font-medium">
          There is an issue while resetting your password. This could be due to
          an internet connection problem or a system error.
        </p>
        <p className="mx-auto text-center text-lg font-medium">
          Please check your connection & click the link in your email to retry.
        </p>
      </div>
      <LocaleLink href={ROUTERS.LOGIN}>
        <MyButton type="submit" className="w-full">
          Back to Log in
        </MyButton>
      </LocaleLink>
    </div>
  );
};

export default NewPasswordFailed;
