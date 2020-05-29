// Import express and establish express router
const express = require('express');
const router = express.Router();

// Import burgers model
const burger = require('../models/burgers.js');

// Routes
router.get('/', (req, res) => {
  burger.all((data) => {
    // Create handlebars obj containing all burgers data from DB
    let hbsObj = {
      burgers: data
    };
    // Render index handlebars view with handlebars obj
    res.render('index', hbsObj);
  });
});

// Creating a new burger
router.post('/api/burgers', (req, res) => {
  burger.create(
    ['name', 'isDevoured'],
    [req.body.name, req.body.isDevoured],
    (result) => {
      // Sending back ID of new burger
      res.json({ id: result.insertId });
    }
  );
});

// Changing status of isDevoured boolean
router.put('/api/burgers/:id', (req, res) => {
  let condition = `id = ${req.params.id}`;

  burger.update(
    {
      isDevoured: req.body.isDevoured
    },
    condition,
    (result) => {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else res.status(200).end();
    }
  );

  res.end();
});

// Export router for server
module.exports = router;
