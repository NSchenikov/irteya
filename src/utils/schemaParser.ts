import { JSONSchema, Field, ValidationRules } from '../types/schema';

function buildRules(schema: JSONSchema, isRequired: boolean, fieldName: string): ValidationRules {
  const rules: ValidationRules = {};

  if (isRequired) {
    rules.required = `${fieldName} обязательно`;
  }

  if (schema.type === 'string') {
    if (schema.minLength !== undefined) {
      rules.minLength = {
        value: schema.minLength,
        message: `Минимальная длина ${schema.minLength} символов`,
      };
    }
    if (schema.maxLength !== undefined) {
      rules.maxLength = {
        value: schema.maxLength,
        message: `Максимальная длина ${schema.maxLength} символов`,
      };
    }
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    if (schema.minimum !== undefined) {
      rules.min = {
        value: schema.minimum,
        message: `Минимальное значение ${schema.minimum}`,
      };
    }
    if (schema.maximum !== undefined) {
      rules.max = {
        value: schema.maximum,
        message: `Максимальное значение ${schema.maximum}`,
      };
    }
  }

  if (schema.type === 'array') {
    if (schema.minItems !== undefined) {
      rules.minItems = {
        value: schema.minItems,
        message: `Минимум ${schema.minItems} элементов`,
      };
    }
    if (schema.maxItems !== undefined) {
      rules.maxItems = {
        value: schema.maxItems,
        message: `Максимум ${schema.maxItems} элементов`,
      };
    }
  }

  return rules;
}

export function parseSchema(schema: JSONSchema, parentKey = '', parentRequired: string[] = []): Field[] {
  if (schema.type === 'object' && schema.properties) {
    return Object.entries(schema.properties).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const isRequired = parentRequired.includes(key);

      const field: Field = {
        name: fullKey,
        label: key,
        type: value.enum ? 'enum' : (value.type as Field['type']),
        options: value.enum,
        rules: buildRules(value, isRequired, key),
      };

      if (value.type === 'object') {
        field.properties = parseSchema(value, fullKey, value.required || []);
      }

      if (value.type === 'array' && value.items) {
        field.type = 'array';
        field.items = parseSchema(value.items, fullKey, value.items.required || [])[0];
      }

      return field;
    });
  }

  if (schema.type === 'array' && schema.items) {
    return parseSchema(schema.items, parentKey, schema.items.required || []);
  }

  if (schema.enum) {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: 'enum',
        options: schema.enum,
        rules: buildRules(schema, false, parentKey),
      },
    ];
  }

  if (['string', 'boolean', 'integer', 'number'].includes(schema.type)) {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: schema.type === 'integer' ? 'number' : schema.type,
        rules: buildRules(schema, false, parentKey),
      },
    ];
  }

  return [];
}
