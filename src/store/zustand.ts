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
  numCastsAfterFiltering: 0,
  setNumCastsAfterFiltering: (count) => set(() => ({ numCastsAfterFiltering: count })),
}));
