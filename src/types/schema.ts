

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

