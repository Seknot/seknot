import createToken from '../service/token/createToken';

(async () => {
  const token = await createToken('HackCoin', '1.0', 'HACK', 1.0, 1000);
  console.log(token);
})();
