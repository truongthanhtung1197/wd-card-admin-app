import React from "react";

import Text from "../common/Text";

interface Props {
  title1?: string;
  content1?: string[];
  title2?: string;
  content2?: string[];
}

const Note: React.FC<Props> = ({ title1, content1, title2, content2 }) => {
  
  return (
    <div className="flex flex-col gap-8 rounded-lg border border-brand-primary p-6 font-quicksand text-base font-medium leading-[150%] text-[#252525]">
      <div className="flex flex-col gap-2">
        <Text variant="body1-emphasized">{title1}</Text>
        <div className="flex flex-col gap-1">
          {content1?.map((item, index) => (
            <Text variant="body1-regular" key={index}>
              {item}
            </Text>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Text variant="body1-emphasized">{title2}</Text>
        <div className="flex flex-col gap-1">
          {content2?.map((item, index) => (
            <Text variant="body1-regular" key={index}>
              {item}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
