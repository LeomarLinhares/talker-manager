const validateDate = (date) => {
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexDate.test(date);
};

module.exports = validateDate;
