import { botOrNotLabelsQuery } from '@app/queries/queries';
import { useZustand } from '@app/store/zustand';
import { FONT_SIZE } from '@app/styles/themes/constants';
import { useQuery } from '@tanstack/react-query';
import { Select, Space } from 'antd';
import { sift, sort } from 'radash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const BotOrNotLabelsDropdown: React.FC = () => {
  const { t } = useTranslation();
  const { selectedLabels, setSelectedLabels } = useZustand();

  const blQuery = useQuery(botOrNotLabelsQuery());
  const memodBotOrNotLabels = useMemo(
    () => sift(sort(blQuery.data?.results ?? [], (r) => r.cnt, true).map((r) => r.label)),
    [blQuery],
  );
  const filteredOptions =
    selectedLabels.length > 2 ? [] : memodBotOrNotLabels.filter((option) => !selectedLabels.includes(option));

  return (
    <Space direction="vertical" size="small" style={{ width: '280px' }}>
      <Select
        mode="multiple"
        allowClear
        bordered={true}
        style={{ width: '100%', fontSize: FONT_SIZE.xxs }}
        placeholder={t('Selected bot-or-not Labels 🤖|👶 (max 3)')}
        onChange={setSelectedLabels}
        options={filteredOptions.map((label) => ({ label, value: label }))}
      />
    </Space>
  );
};
