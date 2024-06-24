// Warpcast API

interface ChannelObject {
  id: string;
  url?: string;
  name: string;
  description: string;
  imageUrl: string;
  leadFid?: number | null;
  moderatorFid?: number | null;
  createdAt?: number;
  followerCount?: number;
  followedAt?: number;
}
export interface ChannelResponseObject {
  result: {
    channel: ChannelObject;
  };
}
export interface AllChannelsResponseObject {
  result: {
    channels: ChannelObject[];
  };
}
export interface UserFollowingChannelsObject extends AllChannelsResponseObject {
  next?: { cursor: string };
}
