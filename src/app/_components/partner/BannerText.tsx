import React, { memo } from "react";
import { useTranslations } from "next-intl";

import Text from "../common/Text";

const BannerText = () => {
  const t = useTranslations("Partner.banner");

  return (
    <div className="bg-brand-super-light-2 flex flex-col items-center gap-2 rounded-lg px-6 py-4 text-brand-primary">
      <Text className="text-center text-2xl font-bold text-brand-primary">
        {t("title")}
      </Text>
      <Text className="text-center">
        {t("description")}
      </Text>
    </div>
  );
};

export default memo(BannerText);
