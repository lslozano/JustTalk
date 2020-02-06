const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const {
  isMatching
} = require('../controllers/index')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("passport/profile", isMatching)


module.exports = router;

// Require User model
