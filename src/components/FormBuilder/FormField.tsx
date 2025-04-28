import React from 'react';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@mui/material';
import { Field } from '../../types/schema';

interface FormFieldProps {
  field: Field;
}

const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const { control } = useFormContext();

  if (field.type === 'array' && field.items) {
    return <ArrayField field={field} />;
  }

  if (field.type === 'object' && field.properties) {
    return <ObjectField field={field} />;
  }

  return <PrimitiveField field={field} />;
};

const ArrayField: React.FC<FormFieldProps> = ({ field }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  });

  return (
    <Box mb={3}>
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
          switch (field.items?.type) {
            case 'string':
              append('');
              break;
            case 'number':
              append(0);
              break;
            case 'boolean':
              append(false);
              break;
            default:
              append({});
          }
        }}
      >
        Добавить
      </Button>
    </Box>
  );
};

const ObjectField: React.FC<FormFieldProps> = ({ field }) => (
  <Box mb={3} pl={2} borderLeft="2px solid #eee">
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      {field.label}
    </Typography>
    {field.properties?.map((subField) => (
      <FormField key={subField.name} field={subField} />
    ))}
  </Box>
);

const PrimitiveField: React.FC<FormFieldProps> = ({ field }) => {
  const { control } = useFormContext();

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
              helperText={fieldState.error?.message || ''}
              margin="normal"
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
              control={
                <Checkbox
                  {...controllerField}
                  checked={!!controllerField.value}
                  onChange={(e) => controllerField.onChange(e.target.checked)}
                />
              }
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
            <FormControl fullWidth margin="normal" error={!!fieldState.error}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                {...controllerField}
                value={field.options?.includes(controllerField.value) ? controllerField.value : ''}
                label={field.label}
              >
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
