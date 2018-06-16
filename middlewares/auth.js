const Network = require('health-ledger-network');
const atob = require('atob');

module.exports = function(config) {
  return async (req, res, next) => {

    let crypto = req.headers.crypto;

    try {
      crypto = atob(crypto);
      req.identity = JSON.parse(crypto);

      if(!req.identity.fabricCert)
        throw new Error();

      if(!req.identity.pubKey)
        throw new Error();

      req.client = await Network.HealthClient.initWithIdentity(config, req.identity.fabricCert);

    } catch(err) {
      console.log(err)
      return res.status(401).send("no authentication headers given: ");
    }

    next();
  };
}
