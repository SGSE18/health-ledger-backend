var router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        message: 'this is a request'
    });
});

router.post('/', function (req, res) {
    res.json({
        message: 'you posted a request'
    });
});

router.put('/', function (req, res) {
    res.json({
        message: 'you put a request'
    });
});

module.exports = router;