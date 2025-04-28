import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { parseSchema } from '../../utils/schemaParser';
import FormField from './FormField';
import { JSONSchema, FormValues } from '../../types/schema';
import { useState } from 'react';

interface FormBuilderProps {
  schema: JSONSchema;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ schema }) => {
  const methods = useForm<FormValues>({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [submitResult, setSubmitResult] = useState<FormValues | null>(null);

  const { handleSubmit } = methods;

  const fields = parseSchema(schema, '', schema.required || []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
    setSubmitResult(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          {fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Отправить
        </Button>
      </form>

      {submitResult && (
        <Box mt={4}>
          <Typography variant="h6">Результат отправки:</Typography>
          <pre>{JSON.stringify(submitResult, null, 2)}</pre>
        </Box>
      )}
    </FormProvider>
  );
};

export default FormBuilder;
