// @ts-nocheck
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import FormFieldSpacer from './FormFieldSpacer';

const RoomItemFormDialog: React.FC<{
  title?: string;
  isOpen: boolean;
  onClose: (e: any) => void;
  onSubmit: (e: any, others: {}) => void;
  initialValues?: any;
}> = ({ onSubmit, initialValues = {}, title, isOpen, onClose }) => {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useFormik({
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
      volume: Yup.number(),
      count: Yup.number(),
      description: Yup.string()
        .min(2, 'Too Short')
        .max(2000, 'Too Long'),
    }),
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}

      {/* This is a workaround to retain the modal width.
      By default, the model content shrinks when there is no DialogContentText. */}
      <div style={{ width: '600px' }} />

      <DialogContent>
        <TextField
          name="name"
          label="name"
          onChange={handleChange}
          value={values.name}
          error={errors.name && touched.name}
          helperText={errors.name}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <FormFieldSpacer />
        <TextField
          type="number"
          min="0"
          name="volume"
          label="volume"
          onChange={handleChange}
          value={values.volume}
          error={errors.volume && touched.volume}
          helperText={errors.volume}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <FormFieldSpacer />
        <TextField
          type="number"
          min="1"
          name="count"
          label="count"
          onChange={handleChange}
          value={values.count}
          error={errors.count && touched.count}
          helperText={errors.count}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <FormFieldSpacer />
        <TextField
          multiline
          name="description"
          label="Description"
          onChange={handleChange}
          value={values.description}
          rows="10"
          error={errors.description && touched.description}
          helperText={errors.description}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomItemFormDialog;
