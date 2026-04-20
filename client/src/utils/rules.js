export const rules = {
  required: (value) => 
    (value !== null && value !== undefined && value.toString().trim() !== "") 
    || "Este campo es obligatorio",

  onlyLetters: (value) => {
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    return regex.test(value) || "Solo se permiten letras";
  },

  isNumber: (value) => 
    (!isNaN(value) && value !== '') || "Debe ser un valor numérico",

  minLength: (min) => (value) => 
    (value && value.length >= min) || `Mínimo ${min} caracteres`,
    
  positive: (value) => 
    parseFloat(value) > 0 || "Debe ser mayor a 0"
};