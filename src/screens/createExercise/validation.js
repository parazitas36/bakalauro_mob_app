export const Validation = (name, description) => {
  return {
    validName: name !== null && String(name).length > 0,
    validDescription: description !== null && String(description).length > 0 && String(description).length < 250
  };
};
