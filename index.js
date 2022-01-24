const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const tokenGenerator = require('./api/helpers/tokenGenerator');
const { thereIsAEmail, isValidEmail } = require('./api/middlewares/isValidEmail');
const { haveSixCharacters, thereIsAPassword } = require('./api/middlewares/isValidPassword');
const validateToken = require('./api/middlewares/validateToken');
const { validateTalk, validateRate, validateDate } = require('./api/middlewares/validateTalk');
const validateName = require('./api/middlewares/validateName');
const validateAge = require('./api/middlewares/validateAge');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talker = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync(talker, 'utf-8'));
  response.status(HTTP_OK_STATUS).json(data);
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  (request, response) => {
  const talkerRequest = request.body;
  const data = JSON.parse(fs.readFileSync(talker, 'utf-8'));
  fs.writeFileSync(talker, JSON.stringify([
    ...data,
    { id: data.length + 1, ...talkerRequest },
  ]), 'utf-8');
  response.status(201).json({ id: data.length + 1, ...talkerRequest });
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(talker, 'utf-8'));
  const requestedData = data.filter((dataObject) => dataObject.id === parseInt(id, 10));
  if (requestedData.length === 0) {
    response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } else {
    response.status(HTTP_OK_STATUS).json(requestedData[0]);
  }
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  (request, response) => {
  const { id } = request.params;
  const data = JSON.parse(fs.readFileSync(talker, 'utf-8'));

  const modifiedData = data.reduce((acc, curr) => {
    if (curr.id === parseInt(id, 10)) return [...acc, { id: parseInt(id, 10), ...request.body }];
    return [...acc, curr];
  }, []);

  fs.writeFileSync(talker, JSON.stringify(modifiedData), 'utf-8');
  response.status(HTTP_OK_STATUS).json({ id: parseInt(id, 10), ...request.body });
});

app.post('/login',
  thereIsAEmail,
  isValidEmail,
  thereIsAPassword,
  haveSixCharacters,
  (request, response) => {
  const token = tokenGenerator(request.body);
  response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
