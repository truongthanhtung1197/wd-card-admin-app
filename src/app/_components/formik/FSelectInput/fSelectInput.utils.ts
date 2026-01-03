import { Option } from ".";

import { isArray, isNilOrEmpty } from "ramda-adjunct";
import { AnyObject } from "yup";

export const mappingDataOptions = ({
  data,
  keyName,
  labelName,
  labelSubName,
}: {
  data?: AnyObject[];
  keyName: string;
  labelSubName?: string;
  labelName: string;
}): Option[] => {
  if (isNilOrEmpty(data) || !isArray(data)) return [];

  return data?.map((item) => {
    const labelSub = labelSubName ? item?.[labelSubName] : "";
    return {
      key: String(item?.[keyName]),
      label: `${item?.[labelName]} ${labelSub}`,
    };
  });
};

type Result = { key: string; label: string };
