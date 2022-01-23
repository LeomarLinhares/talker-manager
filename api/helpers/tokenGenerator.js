const CryptoJS = require('crypto-js');

function tokenGenerator(authInfo) {
  const auth = JSON.stringify(authInfo);
  const salt = CryptoJS.lib.WordArray.random();
  return CryptoJS.PBKDF2(auth, salt, { keySize: 2 }).toString();
}

module.exports = tokenGenerator;

// Documentação do CryptoJS nesse site https://cryptojs.gitbook.io/docs/
// Fazer a chave ter 16 caracteres é responsabilidade do keySize. Aparentemente a
// numeração interfere na quantidade de caracteres multiplicando por 8.
// Isso foi descoberto por tentativa e erro.
