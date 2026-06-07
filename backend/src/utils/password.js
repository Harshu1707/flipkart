const crypto = require('crypto');

const ITERATIONS = 310000;
const KEY_LENGTH = 32;
const DIGEST = 'sha256';

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
  return `pbkdf2_${DIGEST}$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`;
}

function verifyPassword(password, encoded) {
  const [algorithm, iterations, salt, storedHash] = encoded.split('$');
  if (algorithm !== `pbkdf2_${DIGEST}`) return false;
  const hash = crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), Number(iterations), KEY_LENGTH, DIGEST);
  return crypto.timingSafeEqual(hash, Buffer.from(storedHash, 'base64'));
}

module.exports = { hashPassword, verifyPassword };
