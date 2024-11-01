import { createAction, createSlice } from '@reduxjs/toolkit';

interface SignalToNoiseState {
  showMainFeed: boolean;
  showOnlyFollowing: boolean;
  showOnlySassy: boolean;
  showOnlyCuratedChannels: boolean;
  showOnlyFarcaptcha: boolean;
}

const showMainFeed = localStorage.getItem('showMainFeed') === 'true';
const showOnlyFollowing = localStorage.getItem('showOnlyFollowing') === 'true';
const showOnlySassy = localStorage.getItem('showOnlySassy') === 'false';
const showOnlyCuratedChannels = localStorage.getItem('showOnlyCuratedChannels') === 'true';
const showOnlyFarcaptcha = localStorage.getItem('showOnlyFarcaptcha') === 'true';

localStorage.setItem('showMainFeed', JSON.stringify(showMainFeed));
localStorage.setItem('showOnlyFollowing', JSON.stringify(showOnlyFollowing));
localStorage.setItem('showOnlySassy', JSON.stringify(showOnlySassy));
localStorage.setItem('showOnlyCuratedChannels', JSON.stringify(showOnlyCuratedChannels));
localStorage.setItem('showOnlyFarcaptcha', JSON.stringify(showOnlyFarcaptcha));

const initialState: SignalToNoiseState = {
  showMainFeed,
  showOnlyFollowing,
  showOnlySassy,
  showOnlyCuratedChannels,
  showOnlyFarcaptcha,
};

export const setShowMainFeed = createAction('signalToNoise/setShowMainFeed', () => {
  localStorage.setItem('showMainFeed', JSON.stringify(true));
  return { payload: true };
});
export const unsetShowMainFeed = createAction('signalToNoise/unsetShowMainFeed', () => {
  localStorage.setItem('showMainFeed', JSON.stringify(false));
  return { payload: false };
});

export const setShowOnlyFollowing = createAction('signalToNoise/setShowOnlyFollowing', () => {
  localStorage.setItem('showOnlyFollowing', JSON.stringify(true));
  return { payload: true };
});
export const unsetShowOnlyFollowing = createAction('signalToNoise/unsetShowOnlyFollowing', () => {
  localStorage.setItem('showOnlyFollowing', JSON.stringify(false));
  return { payload: false };
});

export const setShowOnlySassy = createAction('signalToNoise/setShowOnlySassy', () => {
  localStorage.setItem('showOnlySassy', JSON.stringify(true));
  return { payload: true };
});
export const unsetShowOnlySassy = createAction('signalToNoise/unsetShowOnlySassy', () => {
  localStorage.setItem('showOnlySassy', JSON.stringify(false));
  return { payload: false };
});

export const setShowOnlyCuratedChannels = createAction('signalToNoise/setShowOnlyCuratedChannels', () => {
  localStorage.setItem('showOnlyCuratedChannels', JSON.stringify(true));
  return { payload: true };
});
export const unsetShowOnlyCuratedChannels = createAction('signalToNoise/unsetShowOnlyCuratedChannels', () => {
  localStorage.setItem('showOnlyCuratedChannels', JSON.stringify(false));
  return { payload: false };
});

export const setShowOnlyFarcaptcha = createAction('signalToNoise/setShowOnlyFarcaptcha', () => {
  localStorage.setItem('showOnlyFarcaptcha', JSON.stringify(true));
  return { payload: true };
});
export const unsetShowOnlyFarcaptcha = createAction('signalToNoise/unsetShowOnlyFarcaptcha', () => {
  localStorage.setItem('showOnlyFarcaptcha', JSON.stringify(false));
  return { payload: false };
});

export const signalToNoiseSlice = createSlice({
  name: 'signalToNoise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setShowMainFeed, (state, action) => {
      state.showMainFeed = action.payload;
    });
    // ignore Main Feed rules
    builder.addCase(unsetShowMainFeed, (state, action) => {
      state.showMainFeed = action.payload;
    });
    builder.addCase(setShowOnlyFollowing, (state, action) => {
      state.showOnlyFollowing = action.payload;
    });
    builder.addCase(unsetShowOnlyFollowing, (state, action) => {
      state.showOnlyFollowing = action.payload;
    });
    builder.addCase(setShowOnlySassy, (state, action) => {
      state.showOnlySassy = action.payload;
    });
    builder.addCase(unsetShowOnlySassy, (state, action) => {
      state.showOnlySassy = action.payload;
    });
    builder.addCase(setShowOnlyCuratedChannels, (state, action) => {
      state.showOnlyCuratedChannels = action.payload;
    });
    builder.addCase(unsetShowOnlyCuratedChannels, (state, action) => {
      state.showOnlyCuratedChannels = action.payload;
    });
    builder.addCase(setShowOnlyFarcaptcha, (state, action) => {
      state.showOnlyFarcaptcha = action.payload;
    });
    // ignore Farcaptcha
    builder.addCase(unsetShowOnlyFarcaptcha, (state, action) => {
      state.showOnlyFarcaptcha = action.payload;
    });
  },
});

export default signalToNoiseSlice.reducer;
