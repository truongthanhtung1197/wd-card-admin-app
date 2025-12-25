import { LoanBorrower, LoanPropertyOwner } from "@/model/Loan.model";

import { getFullName } from "./common.util";

import { isArray } from "lodash";

export const getLabelFromOptions = (key: string, option: any[]): string => {
  return (
    option?.find((i) => {
      return i.key === key;
    })?.label || ""
  );
};

export const getOwnerFromBorrower = (
  loanPropertyOwners: any[],
  dataBorrowers: any[],
): string => {
  if (!loanPropertyOwners || !dataBorrowers) return "Unknown";

  const idOwner = loanPropertyOwners
    .map((item) => item.loanBorrowerId)
    .join(",");

  const ownerLabel =
    dataBorrowers.find((item) => item.key === idOwner)?.label || "Unknown";

  return ownerLabel;
};

export const getBorrowerNamesFromLoanReos = ({
  loanReos = [],
  borrowers = [],
}: {
  loanReos: LoanPropertyOwner[];
  borrowers: LoanBorrower[];
}): string => {
  if (!isArray(loanReos) || !isArray(borrowers)) return "";
  return loanReos
    ?.map((i) => {
      const borrower = borrowers?.find((j) => j.id === i.loanBorrowerId) || {};
      return getFullName(borrower);
    })
    ?.join(", ");
};
