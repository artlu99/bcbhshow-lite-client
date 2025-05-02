import { AppDate } from '@app/constants/Dates';
import generatePicker from 'antd/es/date-picker/generatePicker';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import 'antd/es/date-picker/style/index';

export const DayjsDatePicker = generatePicker<AppDate>(dayjsGenerateConfig);
