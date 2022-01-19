import * as crypto from 'crypto';

exports.getRandomId = () => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const N = 16;

  return Array.from(crypto.randomFillSync(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join('');
};
