import { MoonSunSwitch } from '@app/components/common/MoonSunSwitch/MoonSunSwitch';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { ThemeType } from '@app/interfaces/interfaces';
import { setNightMode } from '@app/store/slices/nightModeSlice';
import { setTheme } from '@app/store/slices/themeSlice';

export const ThemePicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const handleClickButton = (theme: ThemeType) => {
    dispatch(setTheme(theme));
    dispatch(setNightMode(false));
  };

  return (
    <MoonSunSwitch
      isMoonActive={theme === 'dark'}
      onClickMoon={() => handleClickButton('dark')}
      onClickSun={() => handleClickButton('light')}
    />
  );
};
