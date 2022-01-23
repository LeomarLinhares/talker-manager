const thereIsAPassword = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  next();
};

const haveSixCharacters = (request, response, next) => {
  const { password } = request.body;
  if (password && password.length < 6) {
    response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  thereIsAPassword,
  haveSixCharacters,
};
