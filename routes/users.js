var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  try {
    throw {
      message: 'errrooooouuuuu',
      status: 500
    };
  } catch (err) {
    next(err);
  }
});

module.exports = router;
