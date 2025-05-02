import nightModeReducer from '@app/store/slices/nightModeSlice';
import pinnedChannelsReducer from '@app/store/slices/pinnedChannelsSlice';
import pwaReducer from '@app/store/slices/pwaSlice';
import showHidesReducer from '@app/store/slices/showHidesSlice';
import signalToNoiseReducer from '@app/store/slices/signalToNoiseSlice';
import themeReducer from '@app/store/slices/themeSlice';
import zenModeReducer from '@app/store/slices/zenModeSlice';

export default {
  nightMode: nightModeReducer,
  theme: themeReducer,
  pwa: pwaReducer,
  showHides: showHidesReducer,
  signalToNoise: signalToNoiseReducer,
  zenMode: zenModeReducer,
  pinnedChannels: pinnedChannelsReducer,
};
