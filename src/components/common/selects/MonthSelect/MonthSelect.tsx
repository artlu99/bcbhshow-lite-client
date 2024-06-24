import { BaseSelect, BaseSelectProps, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Dates } from '@app/constants/Dates';
import { useMemo } from 'react';

export const MonthSelect: React.FC<BaseSelectProps> = ({ className, ...props }) => {
  const months = Dates.getMonths();

  const monthsOptions = useMemo(
    () =>
      months.map((month, index) => (
        <Option key={index} value={index}>
          {month}
        </Option>
      )),
    [months],
  );

  return (
    <BaseSelect className={className} {...props}>
      {monthsOptions}
    </BaseSelect>
  );
};
