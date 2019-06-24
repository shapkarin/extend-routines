export const isFunction = value => typeof value === 'function';
export const toCamelCase = value => value.toLowerCase().replace(/_+(\w)/g, (_, p1) => p1.toUpperCase());;
