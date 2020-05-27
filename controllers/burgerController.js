const express = require('express');

const router = express.Router();

const burger = require('../models/burgers.js');

router.get('/', (req, res) => {
  burger.all((data) => {
    let hbsObj = {
      burgers: data
    };
    console.log(hbsObj);
    res.render('index', hbsObj);
  });
});

module.exports = router;
