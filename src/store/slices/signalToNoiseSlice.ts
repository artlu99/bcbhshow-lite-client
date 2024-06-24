import { createAction, createSlice } from '@reduxjs/toolkit';

interface SignalToNoiseState {
  showMainFeed: boolean;
  showOnlyFollowing: boolean;
  showOnlyCuratedChannels: boolean;
  showOnlyFarcaptcha: boolean;
  onlyShowUpvoted: boolean;
  hideDownvoted: boolean;
  onlyShowRatioAboveThreshold: boolean;
  ratioThreshold: number;
}

const showMainFeed = localStorage.getItem('showMainFeed') === 'true';
const showOnlyFollowing = localStorage.getItem('showOnlyFollowing') === 'true';
const showOnlyCuratedChannels = localStorage.getItem('showOnlyCuratedChannels') === 'true';
const showOnlyFarcaptcha = localStorage.getItem('showOnlyFarcaptcha') === 'true';
const onlyShowUpvoted = localStorage.getItem('onlyShowUpvoted') === 'true';
const hideDownvoted = localStorage.getItem('hideDownvoted') === 'true';
const onlyShowRatioAboveThreshold = localStorage.getItem('onlyShowRatioAboveThreshold') === 'true';
const ratioThreshold = Number(localStorage.getItem('ratioThreshold') ?? '1');

localStorage.setItem('showMainFeed', JSON.stringify(showMainFeed));
localStorage.setItem('showOnlyFollowing', JSON.stringify(showOnlyFollowing));
localStorage.setItem('showOnlyCuratedChannels', JSON.stringify(showOnlyCuratedChannels));
localStorage.setItem('showOnlyFarcaptcha', JSON.stringify(showOnlyFarcaptcha));
localStorage.setItem('onlyShowUpvoted', JSON.stringify(onlyShowUpvoted));
localStorage.setItem('hideDownvoted', JSON.stringify(hideDownvoted));
localStorage.setItem('onlyShowRatioAboveThreshold', JSON.stringify(onlyShowRatioAboveThreshold));
localStorage.setItem('ratioThreshold', JSON.stringify(ratioThreshold));

const initialState: SignalToNoiseState = {
  showMainFeed,
  showOnlyFollowing,
  showOnlyCuratedChannels,
  showOnlyFarcaptcha,
  onlyShowUpvoted,
  hideDownvoted,
  onlyShowRatioAboveThreshold,
  ratioThreshold,
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

export const setOnlyShowUpvoted = createAction('signalToNoise/setOnlyShowUpvoted', () => {
  localStorage.setItem('onlyShowUpvoted', JSON.stringify(true));
  return { payload: true };
});
export const unsetOnlyShowUpvoted = createAction('signalToNoise/unsetOnlyShowUpvoted', () => {
  localStorage.setItem('onlyShowUpvoted', JSON.stringify(false));
  return { payload: false };
});

export const setHideDownvoted = createAction('signalToNoise/setHideDownvoted', () => {
  localStorage.setItem('hideDownvoted', JSON.stringify(true));
  return { payload: true };
});
export const unsetHideDownvoted = createAction('signalToNoise/unsetHideDownvoted', () => {
  localStorage.setItem('hideDownvoted', JSON.stringify(false));
  return { payload: false };
});

export const setOnlyShowRatioAboveThreshold = createAction('signalToNoise/setOnlyShowRatioAboveThreshold', () => {
  localStorage.setItem('onlyShowRatioAboveThreshold', JSON.stringify(true));
  return { payload: true };
});
export const unsetOnlyShowRatioAboveThreshold = createAction('signalToNoise/unsetOnlyShowRatioAboveThreshold', () => {
  localStorage.setItem('onlyShowRatioAboveThreshold', JSON.stringify(false));
  return { payload: false };
});

export const setRatioThreshold = createAction('signalToNoise/setRatioThreshold', (ratioThreshold: number) => {
  localStorage.setItem('ratioThreshold', JSON.stringify(ratioThreshold));
  return { payload: ratioThreshold };
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
    builder.addCase(setOnlyShowUpvoted, (state, action) => {
      state.onlyShowUpvoted = action.payload;
    });
    builder.addCase(unsetOnlyShowUpvoted, (state, action) => {
      state.onlyShowUpvoted = action.payload;
    });
    builder.addCase(setHideDownvoted, (state, action) => {
      state.hideDownvoted = action.payload;
    });
    builder.addCase(unsetHideDownvoted, (state, action) => {
      state.hideDownvoted = action.payload;
    });
    builder.addCase(setOnlyShowRatioAboveThreshold, (state, action) => {
      state.onlyShowRatioAboveThreshold = action.payload;
    });
    builder.addCase(unsetOnlyShowRatioAboveThreshold, (state, action) => {
      state.onlyShowRatioAboveThreshold = action.payload;
    });
    builder.addCase(setRatioThreshold, (state, action) => {
      state.ratioThreshold = action.payload;
    });
  },
});

export default signalToNoiseSlice.reducer;
