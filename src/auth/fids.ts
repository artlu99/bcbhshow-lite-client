import { INeynarAuthenticatedUser } from '@neynar/react/dist/types/common';

export const getFidWithFallback = (user: INeynarAuthenticatedUser | null): number => {
  return user?.fid ?? (import.meta.env.REACT_APP_DEFAULT_FID as number);
};

export const getStrictFid = (user: INeynarAuthenticatedUser | null): number | undefined => {
  return user?.fid;
};
