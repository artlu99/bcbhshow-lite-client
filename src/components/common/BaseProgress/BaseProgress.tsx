import { Progress, ProgressProps } from 'antd';

export type BaseProgressProps = ProgressProps;

export const BaseProgress: React.FC<ProgressProps> = (props) => {
  return <Progress {...props} />;
};
