var router = require('express').Router();

router.get('/', async (req, res) => {
  let user = await req.client.getUser();
  res.send(user);
});

router.post('/', async (req, res) => {
  try {
    await req.client.postUser({publicKey: req.identity.pubKey});
  }
  catch(error){
    return res.status(403).send("invalid certificate");
  }

  res.status(200).send();
});

module.exports = router;
