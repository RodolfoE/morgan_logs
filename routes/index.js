var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hello, world!');
  res.render('index', { title: 'Express' });
});

router.post('/bla', function (req, res, next) {
  try {
    throw {
      message: 'not cool, yoo!',
      status: 500
    }
  } catch (e) {
    next(e);
  }

});

router.put('/bla/:id', function (req, res, next) {
  try {
    throw {
      message: 'not cool, yoo!',
      status: 500
    }
  } catch (e) {
    next(e);
  }

});

module.exports = router;
