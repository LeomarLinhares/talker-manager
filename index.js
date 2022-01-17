const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

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
  const data = fs.readFileSync(talker, 'utf-8');
  response.status(HTTP_OK_STATUS).json(JSON.parse(data));
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

app.listen(PORT, () => {
  console.log('Online');
});
