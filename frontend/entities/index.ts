/**
 * The log in form data.
 */
export type LogInFormData = {
  email: string;
  password: string;
}

/**
 * The user entity.
 */
export type User = {
  id: string;
  email: string;
  user: string;
  profilePicture?: File;
}

/**
 * The available message status.
 */
export enum MessageStatus {
  SENT = 'sent',
  RECEIVED = 'received'
}

/**
 * The message entity.
 */
export type Message = {
  id: string;
  sender: User;
  receiver: User;
  payload: string;
  timestamp: number;
  status: MessageStatus;
}
