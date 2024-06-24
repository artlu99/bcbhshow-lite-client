import { TableProps } from 'antd';
import * as S from './BaseTable.styles';

export type BaseTableProps<T> = TableProps<T>;

// TODO make generic!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BaseTable: React.FC<BaseTableProps<any>> = (props) => {
  return <S.Table {...props} />;
};
