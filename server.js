const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

// Serves Static Content
app.use(express.static('public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// const routes = require('./controllers/burgerController.js');

// app.use(routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost: ${PORT}`);
});
