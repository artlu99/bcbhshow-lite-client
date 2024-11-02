import { createAction, createSlice } from '@reduxjs/toolkit';

interface ZenModeState {
  showEmbeds: boolean;
  showReactions: boolean;
  showAltClientLinks: boolean;
  showImageOnly: boolean;
  showPFPs: boolean;
  showDisplayNames: boolean;
  showUserNames: boolean;
  showBotOrNotIndicator: boolean;
}

const showEmbeds = localStorage.getItem('showEmbeds') === 'true';
const showReactions = localStorage.getItem('showReactions') ? localStorage.getItem('showReactions') === 'true' : true;
const showAltClientLinks = localStorage.getItem('showAltClientLinks')
  ? localStorage.getItem('showAltClientLinks') === 'true'
  : true;
const showImageOnly = localStorage.getItem('showImageOnly') === 'true';
const showPFPs = localStorage.getItem('showPFPs') === 'true';
const showDisplayNames = localStorage.getItem('showDisplayNames') === 'true';
const showUserNames = localStorage.getItem('showUserNames') ? localStorage.getItem('showUserNames') === 'true' : true;
const showBotOrNotIndicator = localStorage.getItem('showBotOrNotIndicator')
  ? localStorage.getItem('showBotOrNotIndicator') === 'true'
  : true;

localStorage.setItem('showEmbeds', JSON.stringify(showEmbeds));
localStorage.setItem('showReactions', JSON.stringify(showReactions));
localStorage.setItem('showAltClientLinks', JSON.stringify(showAltClientLinks));
localStorage.setItem('showImageOnly', JSON.stringify(showImageOnly));
localStorage.setItem('showPFPs', JSON.stringify(showPFPs));
localStorage.setItem('showDisplayNames', JSON.stringify(showDisplayNames));
localStorage.setItem('showUserNames', JSON.stringify(showUserNames));
localStorage.setItem('showBotOrNotIndicator', JSON.stringify(showBotOrNotIndicator));

const initialState: ZenModeState = {
  showEmbeds,
  showReactions,
  showAltClientLinks,
  showImageOnly,
  showPFPs,
  showDisplayNames,
  showUserNames,
  showBotOrNotIndicator,
};

export const setHideEmbeds = createAction('zenMode/hideEmbeds', () => {
  localStorage.setItem('showEmbeds', JSON.stringify(false));
  return { payload: false };
});
export const setShowEmbeds = createAction('zenMode/showEmbeds', () => {
  localStorage.setItem('showEmbeds', JSON.stringify(true));
  return { payload: true };
});

export const setHideReactions = createAction('zenMode/hideReactions', () => {
  localStorage.setItem('showReactions', JSON.stringify(false));
  return { payload: false };
});
export const setShowReactions = createAction('zenMode/showReactions', () => {
  localStorage.setItem('showReactions', JSON.stringify(true));
  return { payload: true };
});

export const setHideAltClientLinks = createAction('zenMode/hideAltClientLinks', () => {
  localStorage.setItem('showAltClientLinks', JSON.stringify(false));
  return { payload: false };
});
export const setShowAltClientLinks = createAction('zenMode/showAltClientLinks', () => {
  localStorage.setItem('showAltClientLinks', JSON.stringify(true));
  return { payload: true };
});

export const setHideImageOnly = createAction('zenMode/hideImageOnly', () => {
  localStorage.setItem('showshowImageOnly', JSON.stringify(false));
  return { payload: false };
});
export const setShowImageOnly = createAction('zenMode/showImageOnly', () => {
  localStorage.setItem('showImageOnly', JSON.stringify(true));
  return { payload: true };
});

export const setHidePFPs = createAction('zenMode/hidePFPs', () => {
  localStorage.setItem('showPFPs', JSON.stringify(false));
  return { payload: false };
});
export const setShowPFPs = createAction('zenMode/showPFPs', () => {
  localStorage.setItem('showPFPs', JSON.stringify(true));
  return { payload: true };
});

export const setHideDisplayNames = createAction('zenMode/hideDisplayNames', () => {
  localStorage.setItem('showDisplayNames', JSON.stringify(false));
  return { payload: false };
});
export const setShowDisplayNames = createAction('zenMode/showDisplayNames', () => {
  localStorage.setItem('showDisplayNames', JSON.stringify(true));
  return { payload: true };
});

export const setHideUserNames = createAction('zenMode/hideUserNames', () => {
  localStorage.setItem('showUserNames', JSON.stringify(false));
  return { payload: false };
});
export const setShowUserNames = createAction('zenMode/showUserNames', () => {
  localStorage.setItem('showUserNames', JSON.stringify(true));
  return { payload: true };
});

export const setHideBotOrNotIndicator = createAction('zenMode/hideBotOrNotIndicator', () => {
  localStorage.setItem('showBotOrNotIndicator', JSON.stringify(false));
  return { payload: true };
});
export const setShowBotOrNotIndicator = createAction('zenMode/showBotOrNotIndicator', () => {
  localStorage.setItem('showBotOrNotIndicator', JSON.stringify(true));
  return { payload: false };
});

export const zenModeSlice = createSlice({
  name: 'zenMode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setShowEmbeds, (state, action) => {
      state.showEmbeds = action.payload;
    });
    builder.addCase(setHideEmbeds, (state, action) => {
      state.showEmbeds = action.payload;
    });
    builder.addCase(setShowReactions, (state, action) => {
      state.showReactions = action.payload;
    });
    builder.addCase(setHideReactions, (state, action) => {
      state.showReactions = action.payload;
    });
    builder.addCase(setShowAltClientLinks, (state, action) => {
      state.showAltClientLinks = action.payload;
    });
    builder.addCase(setHideAltClientLinks, (state, action) => {
      state.showAltClientLinks = action.payload;
    });
    builder.addCase(setShowImageOnly, (state, action) => {
      state.showImageOnly = action.payload;
    });
    builder.addCase(setHideImageOnly, (state, action) => {
      state.showImageOnly = action.payload;
    });
    builder.addCase(setShowPFPs, (state, action) => {
      state.showPFPs = action.payload;
    });
    builder.addCase(setHidePFPs, (state, action) => {
      state.showPFPs = action.payload;
    });
    builder.addCase(setShowDisplayNames, (state, action) => {
      state.showDisplayNames = action.payload;
    });
    builder.addCase(setHideDisplayNames, (state, action) => {
      state.showDisplayNames = action.payload;
    });
    builder.addCase(setShowUserNames, (state, action) => {
      state.showUserNames = action.payload;
    });
    builder.addCase(setHideUserNames, (state, action) => {
      state.showUserNames = action.payload;
    });
    builder.addCase(setShowBotOrNotIndicator, (state, action) => {
      state.showBotOrNotIndicator = action.payload;
    });
    builder.addCase(setHideBotOrNotIndicator, (state, action) => {
      state.showBotOrNotIndicator = action.payload;
    });
  },
});

export default zenModeSlice.reducer;
