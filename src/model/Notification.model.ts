import { User } from "./User.model";

export enum NOTIFICATION_TYPE {
  MENTION = "MENTION",
}

/**
 * Unified notification model used across sockets and REST
 */
export interface INotification {
  id: number;
  senderId: number | null;
  receiverId: number;
  message: string;
  type?: string | NOTIFICATION_TYPE; // keep enum compatibility
  readAt: string | null;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  sender?: Partial<User> & { id: number };
  receiver?: Partial<User> & { id: number };
}

export type NotificationResponse = {
  data: INotification[];
  total: number;
  limit: number;
  page: number;
};
