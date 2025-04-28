

import { JSONSchema, Field } from '../types/schema';


function buildRules(schema: JSONSchema): any {
  const rules: any = {};

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
    const minItems = schema.minItems;
    const maxItems = schema.maxItems;

    if (minItems !== undefined) {
      rules.validate = (value: any[]) =>
        (value?.length ?? 0) >= minItems
          ? true
          : `Минимум ${minItems} элементов`;
    }
    if (maxItems !== undefined) {
      const previousValidate = rules.validate;
      rules.validate = (value: any[]) => {
        if (previousValidate && previousValidate(value) !== true) {
          return previousValidate(value);
        }
        return (value?.length ?? 0) <= maxItems
          ? true
          : `Максимум ${maxItems} элементов`;
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

      return {
        name: fullKey,
        label: key,
        type: value.enum ? 'enum' : (value.type as Field['type']),
        options: value.enum,
        rules: {
          ...(buildRules(value)),
          ...(isRequired ? { required: `Поле "${key}" обязательно` } : {}),
        },
        ...(value.type === 'object'
          ? { properties: parseSchema(value, fullKey, value.required || []) }
          : {}),
        ...(value.type === 'array'
          ? { items: parseSchema(value.items!, fullKey, value.items?.required || [])[0], rules: buildRules(value) }
          : {}),
      };
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
        rules: {},
      },
    ];
  }

  if (schema.type === 'string' || schema.type === 'boolean') {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: schema.type,
        rules: buildRules(schema),
      },
    ];
  }

  if (schema.type === 'integer' || schema.type === 'number') {
    return [
      {
        name: parentKey,
        label: parentKey,
        type: 'number',
        rules: buildRules(schema),
      },
    ];
  }

  return [];
}
