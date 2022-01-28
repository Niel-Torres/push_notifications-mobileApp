/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
export const PushNotifications = {
  async requestPermissions(): Promise<{receive: string | undefined}>{
    return { receive: undefined };
  },
  async checkPermissions(): Promise<{receive: string | undefined}>{
    return { receive: undefined };
  },
  async register(): Promise<void>{},
  async addListener(eventName: any, actionEvent: (event: any) => void ): Promise<{res: string | undefined}>{
      return { res: undefined };
    },
  async removeAllDeliveredNotifications(): Promise<void>{},
};

export interface Token {
  value: string;
}

export interface ActionPerformed {
  actionId: string;
  inputValue?: string;
  notification: PushNotificationSchema;
}

export interface PushNotificationSchema {
  title?: string;
  subtitle?: string;
  body?: string;
  id: string;
  badge?: number;
  notification?: any;
  data: any;
  click_action?: string;
  link?: string;
  group?: string;
  groupSummary?: boolean;
}
