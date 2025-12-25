import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";
import { User } from "@/model";
import { cn, getImageUrl } from "@/utils/common.util";

export default function Avatar({
  user,
  className,
  letterSize = 20,
}: {
  user?: User;
  className?: string;
  letterSize?: number;
}) {
  const lastFile = user?.fileRelations?.length - 1;
  const path = user?.fileRelations[lastFile]?.file?.path || null;
  return (
    <div
      className={cn(
        "relative h-5 w-5 shrink-0 overflow-hidden rounded-full border-1 border-gray-300",
        className,
      )}
    >
      {getImageUrl(path) ? (
        <img
          src={getImageUrl(path) || ""}
          alt="User Avatar"
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <LetterAvatar
          letter={user?.displayName || user?.username || ""}
          size={letterSize}
        />
      )}
    </div>
  );
}
