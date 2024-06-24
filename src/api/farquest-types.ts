interface User {
  fid: string;
  external: boolean;
  custodyAddress: string;
  connectedAddress: string | null;
  allConnectedAddresses: {
    ethereum: string[];
    solana: string[];
  };
  username: string;
  displayName?: string;
  registeredAt: number;
  followingCount: number;
  followerCount: number;
  pfp: {
    url: string;
    verified: boolean;
  };
  bio: {
    text: string;
    mentions: string[];
  };
}

export interface FollowingByFidResponseSchema {
  result: {
    users: User[];
    next?: string;
  };
  source: string;
}

export interface ReactionsByHashResponseSchema {
  result: {
    likes?: User[];
    recasters?: User[];
    next?: string;
  };
  source: string;
}
