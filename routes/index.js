var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello, world!');
  res.render('index', { title: 'Express' });
});

router.post('/bla', function(req, res, next) {
  res.send(req.body).json();
});

module.exports = router;
