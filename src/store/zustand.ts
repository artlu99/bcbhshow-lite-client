import { create } from 'zustand';

interface ZustandState {
  activeChannelId: string | undefined;
  setActiveChannelId: (channel: string) => void;
  numCasts: number;
  setNumCasts: (count: number) => void;
  numMainFeedCasts: number;
  setNumMainFeedCasts: (count: number) => void;
  numFollowingCasts: number;
  setNumFollowingCasts: (count: number) => void;
  numCuratedChannelsCasts: number;
  setNumCuratedChannelsCasts: (count: number) => void;
  numFarcaptchas: number;
  setNumFarcaptchas: (count: number) => void;
  selectedLabels: string[];
  setSelectedLabels: (labels: string[]) => void;
  numLabels: number;
  setNumLabels: (count: number) => void;
  numUpvotes: number;
  setNumUpvotes: (count: number) => void;
  numDownvotes: number;
  setNumDownvotes: (count: number) => void;
  numCastsWithUpvotes: number;
  setNumCastsWithUpvotes: (count: number) => void;
  numCastsWithDownvotes: number;
  setNumCastsWithDownvotes: (count: number) => void;
  numCastsAboveThreshold: number;
  setNumCastsAboveThreshold: (count: number) => void;
  numCastsAfterFiltering: number;
  setNumCastsAfterFiltering: (count: number) => void;
}

export const useZustand = create<ZustandState>()((set) => ({
  activeChannelId: undefined,
  setActiveChannelId: (channelId) => set(() => ({ activeChannelId: channelId })),
  numCasts: 0,
  setNumCasts: (count) => set(() => ({ numCasts: count })),
  numMainFeedCasts: 0,
  setNumMainFeedCasts: (count) => set(() => ({ numMainFeedCasts: count })),
  numFollowingCasts: 0,
  setNumFollowingCasts: (count) => set(() => ({ numFollowingCasts: count })),
  numCuratedChannelsCasts: 0,
  setNumCuratedChannelsCasts: (count) => set(() => ({ numCuratedChannelsCasts: count })),
  numFarcaptchas: 0,
  setNumFarcaptchas: (count) => set(() => ({ numFarcaptchas: count })),
  selectedLabels: [],
  setSelectedLabels: (labels) => set(() => ({ selectedLabels: labels })),
  numLabels: 0,
  setNumLabels: (count) => set(() => ({ numLabels: count })),
  numUpvotes: 0,
  setNumUpvotes: (count) => set(() => ({ numUpvotes: count })),
  numDownvotes: 0,
  setNumDownvotes: (count) => set(() => ({ numDownvotes: count })),
  numCastsWithUpvotes: 0,
  setNumCastsWithUpvotes: (count) => set(() => ({ numCastsWithUpvotes: count })),
  numCastsWithDownvotes: 0,
  setNumCastsWithDownvotes: (count) => set(() => ({ numCastsWithDownvotes: count })),
  numCastsAboveThreshold: 0,
  setNumCastsAboveThreshold: (count) => set(() => ({ numCastsAboveThreshold: count })),
  numCastsAfterFiltering: 0,
  setNumCastsAfterFiltering: (count) => set(() => ({ numCastsAfterFiltering: count })),
}));
