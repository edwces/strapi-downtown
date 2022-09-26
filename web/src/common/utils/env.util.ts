export const env = (value: string, fallbackValue?: any) => {
  if (process.env[value] === undefined) return fallbackValue;
  return process.env[value];
};
