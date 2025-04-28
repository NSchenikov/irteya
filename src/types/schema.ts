

export type JSONSchemaType = 'string' | 'integer' | 'number' | 'boolean' | 'array' | 'object';

export interface JSONSchema {
  type: JSONSchemaType;
  properties?: {
    [key: string]: JSONSchema;
  };
  items?: JSONSchema;
  enum?: string[];
  required?: string[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
}

export interface Field {
  name: string;
  label: string;
  type: 'string' | 'number' | 'integer' | 'boolean' | 'enum' | 'array' | 'object';
  options?: string[]; 
  items?: Field;      
  properties?: Field[]; 
  rules?: any;
}

export type ValidationRules = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  minItems?: { value: number; message: string };
  maxItems?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};

export type FormValues = {
  [key: string]: any;
};

