import { FileTextOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseInputProps } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SuffixInput } from '@app/components/common/inputs/SuffixInput/SuffixInput';
import { websitePattern } from '@app/constants/patterns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface OpenURLInputProps extends BaseInputProps {
  href?: string;
  target?: string;
}

export const OpenURLInput: React.FC<OpenURLInputProps> = ({ href, target = '_blank', ...props }) => {
  const { t } = useTranslation();

  const isMatch = useMemo(() => new RegExp(websitePattern).test(href || ' '), [href]);

  return (
    <SuffixInput
      suffix={
        <BaseTooltip title={t('common.openInNewTab')}>
          <BaseButton
            size="small"
            href={href}
            target={target}
            disabled={!isMatch}
            type="text"
            icon={<FileTextOutlined />}
          />
        </BaseTooltip>
      }
      {...props}
    />
  );
};
