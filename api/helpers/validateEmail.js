const validateEmail = (email) => (
  String(email)
  .toLowerCase()
  .match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
);

module.exports = validateEmail;