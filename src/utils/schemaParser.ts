

import { JSONSchema, Field } from '../types/schema';

export function parseSchema(schema: JSONSchema, parentKey = ''): Field[] {
  if (schema.type === 'object' && schema.properties) {
    return Object.entries(schema.properties).flatMap(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      return parseSchema(value, fullKey);
    });
  }

  if (schema.type === 'array' && schema.items) {
    const fullKey = parentKey ? `${parentKey}` : '';
    return parseSchema(schema.items, fullKey);
  }

  if (schema.enum) {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: 'enum',
        options: schema.enum,
      },
    ];
  }

  if (schema.type === 'string' || schema.type === 'boolean') {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: schema.type,
      },
    ];
  }

  if (schema.type === 'integer' || schema.type === 'number') {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: 'number',
      },
    ];
  }

  return [];
}
