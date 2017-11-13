export const checkForValidEnum = (
  enums = [],
  value = '',
  message = 'Unknown error occurred!',
) => {
  if (!enums.includes(value)) throw new Error(message);

  return null;
};

/* COMPILED DEFAULT EXPORT */
export default {
  checkForValidEnum,
};
