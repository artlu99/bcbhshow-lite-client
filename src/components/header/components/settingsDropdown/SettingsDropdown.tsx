import { SettingOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { SettingsOverlay } from '@app/components/header/components/settingsDropdown/settingsOverlay/SettingsOverlay/SettingsOverlay';
import { useState } from 'react';

export const SettingsDropdown: React.FC = () => {
  const [isOpened, setOpened] = useState(false);

  return (
    <BasePopover content={<SettingsOverlay />} trigger="click" onOpenChange={setOpened}>
      <HeaderActionWrapper>
        <BaseButton type={isOpened ? 'ghost' : 'text'} icon={<SettingOutlined />} />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
