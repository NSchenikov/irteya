

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Box } from '@mui/material';
import FormField from './FormField';
import { JSONSchema } from '../../types/schema';
import { parseSchema } from '../../utils/schemaParser';

interface FormBuilderProps {
  schema: JSONSchema;
  onSubmit: (data: any) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ schema, onSubmit }) => {
  const methods = useForm({
    defaultValues: {},
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { handleSubmit } = methods;

  const fields = parseSchema(schema, '', schema.required || []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          {fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default FormBuilder;
