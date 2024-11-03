import { User } from '@privy-io/react-auth';

export const getFidWithFallback = (user: User | null): number => {
  return user?.farcaster?.fid ?? (import.meta.env.REACT_APP_DEFAULT_FID as number);
};

export const getStrictFid = (user: User | null): number | undefined => {
  return user?.farcaster?.fid ?? undefined;
};
