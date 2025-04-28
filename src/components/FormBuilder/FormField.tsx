

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Field } from '../../types/schema';

interface FormFieldProps {
  field: Field;
}

const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const { control } = useFormContext();

  switch (field.type) {
    case 'string':
    case 'number':
    case 'integer':
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => (
            <TextField
              {...controllerField}
              label={field.label}
              type={field.type === 'string' ? 'text' : 'number'}
              fullWidth
            />
          )}
        />
      );
    case 'boolean':
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={false}
          render={({ field: controllerField }) => (
            <FormControlLabel
              control={<Checkbox {...controllerField} checked={!!controllerField.value} />}
              label={field.label}
            />
          )}
        />
      );
    case 'enum':
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => (
            <FormControl fullWidth>
              <InputLabel>{field.label}</InputLabel>
              <Select {...controllerField} label={field.label}>
                {field.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );
    default:
      return null;
  }
};

export default FormField;
