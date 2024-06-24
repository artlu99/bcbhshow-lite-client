import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { RadioBtn } from '@app/components/header/components/settingsDropdown/settingsOverlay/SettingsOverlay/SettingsOverlay.styles';
import { useLanguage } from '@app/hooks/useLanguage';
import ReactCountryFlag from 'react-country-flag';

export const LanguagePicker: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <BaseRadio.Group defaultValue={language} onChange={(e) => setLanguage(e.target.value)}>
      <BaseSpace direction="vertical">
        <RadioBtn value="en">
          <BaseSpace align="center">
            English
            <ReactCountryFlag svg countryCode="GB" />
            <ReactCountryFlag svg countryCode="US" />
          </BaseSpace>
        </RadioBtn>
        <RadioBtn value="es">
          <BaseSpace align="center">
            Español
            <ReactCountryFlag svg countryCode="ES" />
          </BaseSpace>
        </RadioBtn>
        <RadioBtn value="ja">
          <BaseSpace align="center">
            日本語
            <ReactCountryFlag svg countryCode="JP" />
          </BaseSpace>
        </RadioBtn>
        <RadioBtn value="de">
          <BaseSpace align="center">
            Deutsch
            <ReactCountryFlag svg countryCode="DE" />
          </BaseSpace>
        </RadioBtn>
      </BaseSpace>
    </BaseRadio.Group>
  );
};
