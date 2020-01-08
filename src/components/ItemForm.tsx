import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'semantic-ui-react';

type Props = {
  onSubmit: (e: any) => void;
  initialValues?: any;
  submitText?: string;
};

const ItemForm: React.FC<Props> = ({
  onSubmit,
  initialValues = {},
  submitText = 'Submit',
}: Props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit,
    initialValues: {
      name: '',
      description: '',
      volume: 0,
      count: 0,
      ...initialValues,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
      description: Yup.string()
        .min(2, 'Too Short')
        .max(2000, 'Too Long')
        .required('Required'),
      volume: Yup.number(),
      count: Yup.number(),
    }),
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Input
          type="text"
          id="item-name-input"
          name="name"
          label="name"
          onChange={handleChange}
          value={values.name}
          error={
            errors.name && touched.name
              ? { content: errors.name, pointing: 'below' }
              : null
          }
          required
        />
      </Form.Field>

      <Form.Field>
        <Form.TextArea
          type="textarea"
          id="item-description-input"
          name="description"
          label="Description"
          onChange={handleChange}
          value={values.description}
          rows="20"
          error={
            errors.description && touched.description
              ? { content: errors.description, pointing: 'below' }
              : null
          }
          required
        />
      </Form.Field>

      <Form.Field>
        <Form.Input
          type="number"
          min="0"
          id="item-volume-input"
          name="volume"
          label="volume"
          onChange={handleChange}
          value={values.volume}
          error={
            errors.volume && touched.volume
              ? { content: errors.volume, pointing: 'below' }
              : null
          }
          required
        />
      </Form.Field>

      <Form.Field>
        <Form.Input
          type="number"
          min="1"
          id="item-count-input"
          name="count"
          label="count"
          onChange={handleChange}
          value={values.count}
          error={
            errors.count && touched.count
              ? { content: errors.count, pointing: 'below' }
              : null
          }
          required
        />
      </Form.Field>

      <Button type="submit" content={submitText} disabled={isSubmitting} />
    </Form>
  );
};

export default ItemForm;
