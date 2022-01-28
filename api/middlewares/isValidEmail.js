const validateEmail = require('../helpers/validateEmail');

const thereIsAEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email) {
    response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  next();
};

const isValidEmail = (request, response, next) => {
  const { email } = request.body;
  if (!validateEmail(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = {
  thereIsAEmail,
  isValidEmail,
};
