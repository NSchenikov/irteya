import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { parseSchema } from '../../utils/schemaParser';
import FormField from './FormField';
import { JSONSchema } from '../../types/schema';
import { useState } from 'react';

interface FormBuilderProps {
  schema: JSONSchema;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ schema }) => {
  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [result, setResult] = useState<any>(null);

  const { handleSubmit } = methods;

  const fields = parseSchema(schema, '', schema.required || []);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    setResult(data);
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

      {result && (
        <Box mt={4}>
          <Typography variant="h6">Результат отправки:</Typography>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Box>
      )}
    </FormProvider>
  );
};

export default FormBuilder;
