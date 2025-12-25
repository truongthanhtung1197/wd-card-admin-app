import { LoanBorrower } from "@/model/Loan.model";

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

export const mappingDataBorrowersOptions = (data: LoanBorrower[]): Result[] => {
  const result: Result[] = [];
  const processedPairs = new Set<string>(); // Store processed pairs to avoid duplicates

  data.forEach((borrower) => {
    const {
      id,
      firstName,
      lastName,
      loanBorrowerRelationship1,
      loanBorrowerRelationship2,
    } = borrower;

    // Add basic object
    if (id) {
      result.push({ key: id, label: `${firstName} ${lastName}` });
    }

    // Determine loanBorrowerId2 from loanBorrowerRelationship1 or loanBorrowerRelationship2
    const loanBorrowerId =
      loanBorrowerRelationship1?.loanBorrowerId2 ||
      loanBorrowerRelationship2?.loanBorrowerId1;

    if (loanBorrowerId) {
      const relatedBorrower = data.find((item) => item.id === loanBorrowerId);

      if (relatedBorrower) {
        const pairKey = `${id}-${relatedBorrower.id}`; // Create a unique key for the pair
        const reversePairKey = `${relatedBorrower.id}-${id}`; // Create the reverse key

        // Only add the pair if it hasn't been processed before
        if (
          !processedPairs.has(pairKey) &&
          !processedPairs.has(reversePairKey)
        ) {
          result.push({
            key: `${id},${relatedBorrower.id}`,
            label: `${firstName} ${lastName} && ${relatedBorrower.firstName} ${relatedBorrower.lastName}`,
          });

          // Mark the pair as processed
          processedPairs.add(pairKey);
        }
      }
    }
  });

  return result;
};
