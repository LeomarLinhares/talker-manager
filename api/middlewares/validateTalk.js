const validateDate = require('../helpers/validateDate');

const thereIsTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!talk.watchedAt || !talk.rate) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!validateDate(talk.watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (talk.rate > 5 || talk.rate < 1) {
    return response.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  thereIsTalk,
  validateTalk,
};
