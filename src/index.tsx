import { store } from '@app/store/store';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';

const posthogApiKey = import.meta.env.REACT_APP_PUBLIC_POSTHOG_KEY;
const posthogApiHost = import.meta.env.REACT_APP_PUBLIC_POSTHOG_HOST;

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <PostHogProvider apiKey={posthogApiKey} options={{ api_host: posthogApiHost }}>
      <Provider store={store}>
        <App />
      </Provider>
    </PostHogProvider>
  </React.StrictMode>,
);
