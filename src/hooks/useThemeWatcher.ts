import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { ConfigProvider } from 'antd';
import { useEffect, useRef } from 'react';

export const useThemeWatcher = (): void => {
  const theme = useAppSelector((state) => state.theme.theme);
  const root = useRef(document.querySelector(':root'));

  useEffect(() => {
    const html = root.current;
    if (html) {
      html.setAttribute('data-no-transition', '');
      html.setAttribute('data-theme', theme);
      // remove transition after layout update
      requestAnimationFrame(() => {
        html.removeAttribute('data-no-transition');
      });
    }

    ConfigProvider.config({
      theme: {
        primaryColor: themeObject[theme].primary,
        infoColor: themeObject[theme].primary,
        successColor: themeObject[theme].success,
        errorColor: themeObject[theme].error,
        warningColor: themeObject[theme].warning,
      },
    });
  }, [theme]);
};
