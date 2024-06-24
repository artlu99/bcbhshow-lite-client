import { PrepareAction, createAction, createSlice } from '@reduxjs/toolkit';
import { unique } from 'radash';

const DEFAULT_CHANNELS = ['gmfarcaster', 'bnfarcaster', 'bcbhshow'];

interface PinnedChannelsState {
  pinnedChannels: string[];
}

const localStoragePinnedChannels = localStorage.getItem('pinnedChannels');
const pinnedChannels = localStoragePinnedChannels
  ? (JSON.parse(localStoragePinnedChannels) as string[])
  : DEFAULT_CHANNELS;

localStorage.setItem('pinnedChannels', JSON.stringify(pinnedChannels));

const initialState: PinnedChannelsState = { pinnedChannels };

export const pinChannel = createAction<PrepareAction<string[]>>('pinnedChannels/add', (channelId: string) => {
  const pinnedChannels = JSON.parse(localStorage.getItem('pinnedChannels') ?? '[]') as string[];
  const newPinnedChannels = unique((pinnedChannels ?? []).concat(channelId));
  localStorage.setItem('pinnedChannels', JSON.stringify(newPinnedChannels));

  return { payload: newPinnedChannels };
});

export const unpinChannel = createAction<PrepareAction<string[]>>('pinnedChannels/remove', (channelId: string) => {
  const pinnedChannels = JSON.parse(localStorage.getItem('pinnedChannels') ?? '[]') as string[];
  const newPinnedChannels = unique((pinnedChannels ?? []).filter((c) => c !== channelId));
  localStorage.setItem('pinnedChannels', JSON.stringify(newPinnedChannels));

  return { payload: newPinnedChannels };
});

export const pinnedChannelsSlice = createSlice({
  name: 'pinnedChannels',
  initialState,
  reducers: {
    pinnedChannels: (state, action) => {
      state.pinnedChannels = action.payload;
    },
  },
});

export default pinnedChannelsSlice.reducer;
