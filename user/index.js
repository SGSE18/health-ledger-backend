var router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        message: 'this is a user'
    });
});

router.post('/', function (req, res) {
    res.json({
        message: 'you posted a user'
    });
});

module.exports = router;