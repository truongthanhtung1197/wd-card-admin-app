import MyButton from "@/app/_components/common/MyButton";
import { cn } from "@/utils/common.util";
import { Divider } from "@nextui-org/react";

export default function LinkDriveFiled({ linkDrive }: { linkDrive: string }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="col">
        <p
          className={cn(
            "!text-base !font-medium text-neutral-element-secondary",
          )}
        >
          Link Drive
        </p>
        <p className={cn("row mt-1 justify-between break-words leading-6")}>
          {linkDrive || "-"}
          <MyButton bSize="sm">Edit</MyButton>
        </p>
      </div>
      <Divider className="mt-2" />
    </div>
  );
}
