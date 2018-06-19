var router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    let user = await req.client.getUser();
    res.send(user);
  } catch(err){
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await req.client.postUser({publicKey: req.identity.pubKey});
    let user = await req.client.getUser();
    res.send(user);
  } catch(err){
    res.status(500).send(err);
  }

  res.status(200).send();
});

module.exports = router;
