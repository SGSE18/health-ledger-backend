var router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    let requests = await req.client.getRequests();
    res.send(requests);
  } catch(err){
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if(!req.body.publicKey)
      throw new Error("No publicKey given");
    if(!req.body.request)
      throw new Error("No request given")

    await req.client.postRequest(req.body.publicKey, req.body.request);
    res.send();
  } catch(err){
    res.status(500).send(err);
  }
});

router.put('/', async (req, res) => {
  try {
    if(!req.body.publicKey)
      throw new Error("No publicKey given");
    if(!req.body.requestId)
      throw new Error("No publicKey given");
    if(!req.body.result)
      throw new Error("No request given")

    await req.client.updateRequest(req.body.publicKey, req.body.requestId, req.body.result);
    res.send();

  } catch(err){
    res.status(500).send(err);
  }
});

module.exports = router;
