const validateEmptyFields = (fields, res) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") {
      res.status(400).json({
        message: `Please provide missing properties in the request: ${key}`,
      });
      return false;
    }
  }
  return true;
};

export { validateEmptyFields };
