import { act } from 'react';

export const runUserAction = async (
  action: () => Promise<unknown> | void,
): Promise<void> => {
  await act(async () => {
    await action();
  });
};
