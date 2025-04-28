

import React from 'react';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@mui/material';
import { Field } from '../../types/schema';

interface FormFieldProps {
  field: Field;
}

const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const { control } = useFormContext();

  const fieldArray = useFieldArray({
    control,
    name: field.name as any,
  });

  if (field.type === 'array' && field.items) {
    const { fields, append, remove } = fieldArray;

    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>{field.label}</Typography>
        {fields.map((item, index) => (
          <Box key={item.id} display="flex" alignItems="center" gap={1} mb={2}>
            {field.items && (
              <FormField
                field={{
                  ...field.items,
                  name: `${field.name}[${index}]`,
                  label: field.items.label || `${field.label} ${index + 1}`,
                }}
              />
            )}
            <Button variant="outlined" color="error" onClick={() => remove(index)}>
              Удалить
            </Button>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={() => {
            if (field.items?.type === 'string') {
              append('');
            } else if (field.items?.type === 'number') {
              append(0);
            } else if (field.items?.type === 'boolean') {
              append(false);
            } else {
              append({});
            }
          }}
        >
          Добавить
        </Button>
      </Box>
    );
  }

  switch (field.type) {
    case 'string':
    case 'number':
      return (
        <Controller
          name={field.name}
          control={control}
          rules={field.rules}
          defaultValue=""
          render={({ field: controllerField, fieldState }) => (
            <TextField
              {...controllerField}
              label={field.label}
              type={field.type === 'string' ? 'text' : 'number'}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      );
    case 'boolean':
      return (
        <Controller
          name={field.name}
          control={control}
          rules={field.rules}
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
          rules={field.rules}
          defaultValue=""
          render={({ field: controllerField, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel>{field.label}</InputLabel>
              <Select {...controllerField} label={field.label}>
                {field.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <Typography variant="caption" color="error">
                  {fieldState.error.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      );
    default:
      return null;
  }
};

export default FormField;
