

import React from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import schema from './schemas/exampleSchema.json';
import { Container, Typography } from '@mui/material';

function App() {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dynamic Form
      </Typography>
      <FormBuilder schema={schema as any} onSubmit={handleSubmit} />
    </Container>
  );
}

export default App;
