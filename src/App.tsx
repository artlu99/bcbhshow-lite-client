import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';

import { PrivyProvider } from '@privy-io/react-auth';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

import { AppRouter } from '@app/components/router/AppRouter';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useAutoNightMode } from '@app/hooks/useAutoNightMode';
import { useLanguage } from '@app/hooks/useLanguage';
import { usePWA } from '@app/hooks/usePWA';
import { useThemeWatcher } from '@app/hooks/useThemeWatcher';
import { themeObject } from '@app/styles/themes/themeVariables';

import '@fontsource/fira-sans';
import '@fontsource/noto-sans';
import deDe from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import esEs from 'antd/lib/locale/es_ES';
import jaJP from 'antd/lib/locale/ja_JP';

import GlobalStyle from './styles/GlobalStyle';

const appId = import.meta.env.REACT_APP_PRIVY_APP_ID;

const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 2 * 1000 * 60 * 60 * 24, // 48 hours
      },
    },
  });

  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    dehydrateOptions: {
      shouldDehydrateQuery: (query) => !!query.meta?.persist,
    },
  });

  usePWA();

  useAutoNightMode();

  useThemeWatcher();

  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} />
      <GlobalStyle />
      <PrivyProvider
        appId={appId}
        config={{
          loginMethods: ['farcaster'],
          embeddedWallets: { createOnLogin: 'users-without-wallets' },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <ConfigProvider
              locale={language === 'en' ? enUS : language === 'de' ? deDe : language === 'es' ? esEs : jaJP}
            >
              <AppRouter />
            </ConfigProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </>
  );
};

export default App;
