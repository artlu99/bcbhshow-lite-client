import { BaseInputProps, BaseInputRef } from '@app/components/common/inputs/BaseInput/BaseInput';
import React from 'react';
import * as S from './InputPassword.styles';

interface InputPasswordProps extends BaseInputProps {
  className?: string;
  visibilityToggle?: boolean;
  iconRender?: (open: boolean) => React.ReactNode;
}

export const InputPassword = React.forwardRef<BaseInputRef, InputPasswordProps>(
  ({ className, children, ...props }, ref) => (
    <S.InputPassword ref={ref} className={className} {...props}>
      {children}
    </S.InputPassword>
  ),
);
