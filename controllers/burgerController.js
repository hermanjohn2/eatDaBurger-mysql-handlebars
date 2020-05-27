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

router.post('/api/burgers', (req, res) => {
  // console.log(req.body);

  burger.create(
    ['name', 'isDevoured'],
    [req.body.name, req.body.isDevoured],
    (result) => {
      res.json({ id: result.insertId });
    }
  );
});

router.put('/api/burgers/:id', (req, res) => {
  // console.log(req.params.id);
  let condition = `id = ${req.params.id}`;

  burger.update(
    {
      isDevoured: req.body.isDevoured
    },
    condition,
    (result) => {
      // console.log(result);
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else res.status(200).end();
    }
  );

  res.end();
});

module.exports = router;
