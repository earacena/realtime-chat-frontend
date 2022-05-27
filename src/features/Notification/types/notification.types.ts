export interface NotificationState {
  type: string;
  message: string;
  timeoutId: NodeJS.Timeout | undefined;
};

export type NotificationPayload = {
  type: string;
  message: string;
  timeoutId: NodeJS.Timeout;
};
