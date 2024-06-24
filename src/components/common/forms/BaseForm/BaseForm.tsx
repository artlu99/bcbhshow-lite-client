import { BaseFormItem } from '@app/components/common/forms/components/BaseFormItem/BaseFormItem';
import { BaseFormList } from '@app/components/common/forms/components/BaseFormList/BaseFormList';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import { notificationController } from '@app/controllers/notificationController';
import { Form, FormInstance } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseFormProps = Omit<ComponentProps<typeof Form>, 'onFinish'> & { onFinish?: (values: any) => void };

export type BaseFormInstance = FormInstance;

export interface BaseFormInterface<T> extends React.FC<T> {
  Title: typeof BaseFormTitle;
  Item: typeof BaseFormItem;
  List: typeof BaseFormList;
  useForm: typeof Form.useForm;
  Provider: typeof Form.Provider;
}

export const BaseForm: BaseFormInterface<BaseFormProps> = ({ onFinishFailed, layout = 'vertical', ...props }) => {
  const { t } = useTranslation();

  const onFinishFailedDefault = (error: ValidateErrorEntity<unknown>) => {
    notificationController.error({
      message: t('common.error'),
      description: error.errorFields[0].errors,
    });
  };

  return <Form onFinishFailed={onFinishFailed || onFinishFailedDefault} layout={layout} {...props} />;
};

BaseForm.Title = BaseFormTitle;
BaseForm.Item = BaseFormItem;
BaseForm.List = BaseFormList;
BaseForm.useForm = Form.useForm;
BaseForm.Provider = Form.Provider;
