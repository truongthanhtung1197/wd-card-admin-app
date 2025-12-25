import { Admin } from "./Admin.mode";
import { TimeStamp } from "./Common.model";
import { User69vn } from "./User.model";

export interface Group extends TimeStamp {
  id?: string;
  name?: string;
  status?: string;
  adminGroups?: Admin[];
}

export interface CreateGroup {
  name?: string;
  leaderId?: string;
  staffIds?: string[];
}

export interface UserTransaction {
  user?: User69vn;
  transactionSummary?: TransactionSummary;
}

export interface TransactionSummary {
  Total?: number; // TOTAL
  Count?: number; // COUNT PLAYER IN GROUP
}
