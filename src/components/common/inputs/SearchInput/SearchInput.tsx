import { SearchOutlined } from '@ant-design/icons';
import { BaseSpin } from '@app/components/common/BaseSpin/BaseSpin';
import { BaseInputProps, BaseInputRef } from '@app/components/common/inputs/BaseInput/BaseInput';
import React from 'react';
import * as S from './SearchInput.styles';

interface SearchInputProps extends BaseInputProps {
  loading?: boolean;
  filter?: React.ReactNode;
  onSearch?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: React.ReactNode;
  inputPrefixCls?: string;
}

export const SearchInput = React.forwardRef<BaseInputRef, SearchInputProps>(({ loading, filter, ...props }, ref) => {
  return (
    <S.SearchInput
      ref={ref}
      prefix={<SearchOutlined />}
      {...(filter && {
        suffix: (
          <S.Space align="center">
            {loading && <BaseSpin size="small" />}
            {filter}
          </S.Space>
        ),
      })}
      {...props}
    />
  );
});
