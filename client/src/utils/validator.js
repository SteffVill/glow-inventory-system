export const validateForm = (formData, schema) => {
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const value = formData[field];
    const fieldRules = schema[field]; 

    for (let rule of fieldRules) {
      const result = rule(value);
      if (result !== true) {
        errors[field] = result; 
        break; 
      }
    }
  });

  return errors;
};