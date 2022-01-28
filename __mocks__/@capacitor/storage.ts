/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};

