
import { ROUTERS } from "@/constant";
import { cn } from "@/utils/common.util";

import { LocaleLink } from "../../LocaleLink";

import { ErrorMessage } from "formik";

export const CustomErrorMessage = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => (
  <ErrorMessage name={name}>
    {(errorMessage) => {
      try {
        const errorObject = JSON.parse(errorMessage);
        if (errorObject.isDeleted && errorObject.leadId) {
          return (
            <div className="mt-1 text-sm text-accent-error">
              <p>
                This Lead has been deleted. Please review it at this{" "}
                <LocaleLink
                  href={ROUTERS.LEAD_DETAIL.replace(
                    ":leadId",
                    errorObject.leadId,
                  )}
                  className="border-b border-accent-link text-accent-link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  link.
                </LocaleLink>
              </p>
            </div>
          );
        } else if (errorObject.isExist) {
          return (
            <div className="mt-1 text-sm text-accent-error">
              {errorObject?.message ?? "Email already exists."}
            </div>
          );
        }
      } catch {
        return (
          <div className={cn("mt-1 text-sm text-accent-error", className)}>
            {errorMessage}
          </div>
        );
      }
    }}
  </ErrorMessage>
);
