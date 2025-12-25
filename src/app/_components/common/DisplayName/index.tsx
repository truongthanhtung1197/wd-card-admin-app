import { cn } from "@/utils/common.util";

interface DisplayNameProps {
  displayName?: string;
  username?: string;
  isAdmin?: boolean;
  className?: string;
}

export const DisplayName = ({
  displayName,
  username,
  isAdmin,
  className,
}: DisplayNameProps) => {
  if (isAdmin) {
    return (
      <p className="flex flex-col text-left text-base font-medium">
        <span>{displayName}</span>
        <span>{username}</span>
      </p>
    );
  }
  return (
    <p className={cn("truncate text-left text-base font-medium", className)}>
      {displayName || username || "-"}
    </p>
  );
};
