var router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    let treatments = await req.client.getTreatments();
    res.send(treatments);
  } catch(err){
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if(!req.body.publicKey)
      throw new Error("No publicKey given");
    if(!req.body.treatment)
      throw new Error("No request given")

    await req.client.postTreatment(req.body.publicKey, req.body.treatment);
    res.send();
  } catch(err){
    console.log(err)
    res.status(500).send(err);
  }
});

module.exports = router;
