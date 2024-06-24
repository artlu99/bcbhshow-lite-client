import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import { AppDate } from '@app/constants/Dates';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import React from 'react';

export type BaseDatePickerProps = PickerProps<AppDate>;

export const BaseDatePicker = React.forwardRef<React.Component<BaseDatePickerProps>, BaseDatePickerProps>(
  ({ className, ...props }, ref) => <DayjsDatePicker ref={ref} className={className} {...props} />,
);
