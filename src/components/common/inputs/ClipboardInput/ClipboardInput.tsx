import { CopyOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseInputProps } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SuffixInput } from '@app/components/common/inputs/SuffixInput/SuffixInput';
import { notificationController } from 'controllers/notificationController';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface ClipboardInputProps extends BaseInputProps {
  valueToCopy?: string;
}

export const ClipboardInput: React.FC<ClipboardInputProps> = ({ valueToCopy, ...props }) => {
  const { t } = useTranslation();

  const handleCopy = useCallback(
    () =>
      valueToCopy &&
      navigator.clipboard.writeText(valueToCopy).then(() => {
        notificationController.info({ message: t('common.copied') });
      }),
    [valueToCopy, t],
  );

  return (
    <SuffixInput
      suffix={
        <BaseTooltip title={t('common.copy')}>
          <BaseButton size="small" disabled={!valueToCopy} type="text" icon={<CopyOutlined />} onClick={handleCopy} />
        </BaseTooltip>
      }
      {...props}
    />
  );
};
