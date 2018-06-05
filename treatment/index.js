var router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        message: 'this is a treatment'
    });
});

router.post('/', function (req, res) {
    res.json({
        message: 'you posted a treatment'
    });
});

module.exports = router;