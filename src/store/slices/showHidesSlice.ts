import { createAction, createSlice } from '@reduxjs/toolkit';

interface ShowHidesState {
  showAds: boolean;
}

const showAds = localStorage.getItem('showAds') === 'true';

localStorage.setItem('showAds', JSON.stringify(showAds));

const initialState: ShowHidesState = {
  showAds,
};

export const setHideAds = createAction('showHides/hideAds', () => {
  localStorage.setItem('showAds', JSON.stringify(false));

  return {
    payload: false,
  };
});

export const setShowAds = createAction('showHides/showAds', () => {
  localStorage.setItem('showAds', JSON.stringify(true));

  return {
    payload: true,
  };
});

export const showHidesSlice = createSlice({
  name: 'showHides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setShowAds, (state, action) => {
      state.showAds = action.payload;
    });
    builder.addCase(setHideAds, (state, action) => {
      state.showAds = action.payload;
    });
  },
});

export default showHidesSlice.reducer;
