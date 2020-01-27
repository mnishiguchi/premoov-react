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
  Slider,
  FormLabel,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import FormFieldSpacer from './FormFieldSpacer';
import { VolumeUnit } from '../types';
import { displayVolumeValue, VOLUME_UNIT_M3, VOLUME_UNIT_FT3 } from '../lib';
import defaultVolumeLookup from '../data/roomItems.json';

const volumeSliderConfig = (volumeUnit: VolumeUnit) => {
  switch (volumeUnit) {
    case VOLUME_UNIT_M3:
      return {
        step: 0.05,
        min: 0,
        max: 1.5,
      };
    case VOLUME_UNIT_FT3:
      return {
        step: 1,
        min: 0,
        max: 50,
      };
    default:
      throw new Error(`Invalid volume unit ${volumeUnit}`);
  }
};

const RoomItemFormDialog: React.FC<{
  title?: string;
  isOpen: boolean;
  onClose: (e: any) => void;
  onSubmit: (e: any, others: {}) => void;
  initialValues?: any;
  defaultRoomItemNames: string[];
  volumeUnit: VolumeUnit;
}> = ({
  onSubmit,
  title,
  isOpen,
  onClose,
  initialValues = {},
  defaultRoomItemNames = [],
  volumeUnit,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    onSubmit,
    initialValues: {
      name: '',
      description: '',
      count: 0,
      ...initialValues,
      // Use value in current unit.
      volume: displayVolumeValue(initialValues.volume || 0, volumeUnit),
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
        <FormLabel>Name</FormLabel>
        <TextField
          name="name"
          onChange={(e: any) => {
            handleChange(e);
            defaultVolumeLookup[e.target.value] &&
              toast.info(
                `Volume Suggestion: ${displayVolumeValue(
                  defaultVolumeLookup[e.target.value]['m3'],
                  volumeUnit
                )} (${volumeUnit})`
              );
          }}
          value={values.name}
          error={errors.name && touched.name}
          helperText={errors.name}
          fullWidth
          required
          inputProps={{
            list: 'RoomItemFormDialog-defaultRoomItemNames',
          }}
        />
        <datalist id="RoomItemFormDialog-defaultRoomItemNames">
          {defaultRoomItemNames.map(defaultRoomItemName => (
            <option key={defaultRoomItemName} value={defaultRoomItemName} />
          ))}
        </datalist>
        <FormFieldSpacer />

        <FormLabel>{volumeUnit || 'Volume'}</FormLabel>
        <Slider
          name="volume"
          value={values.volume}
          marks
          valueLabelDisplay="auto"
          onChangeCommitted={(e: any, v: number) => setFieldValue('volume', v)}
          {...volumeSliderConfig(volumeUnit)}
        />
        <TextField
          type="number"
          min="1"
          name="volume"
          onChange={handleChange}
          value={values.volume}
          error={errors.volume && touched.volume}
          helperText={errors.volume}
          fullWidth
          required
        />
        <FormFieldSpacer />

        <FormLabel>Count</FormLabel>
        <Slider
          name="count"
          value={values.count}
          step={1}
          marks
          min={0}
          max={20}
          valueLabelDisplay="auto"
          getAriaValueText={(v: number) => JSON.stringify(v)}
          onChangeCommitted={(e: any, v: number) => setFieldValue('count', v)}
        />

        <TextField
          type="number"
          min="1"
          name="count"
          onChange={handleChange}
          value={values.count}
          error={errors.count && touched.count}
          helperText={errors.count}
          fullWidth
          required
        />
        <FormFieldSpacer />

        <FormLabel>Description</FormLabel>
        <TextField
          multiline
          name="description"
          onChange={handleChange}
          value={values.description}
          rows="10"
          error={errors.description && touched.description}
          helperText={errors.description}
          fullWidth
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
