const dotenv = require('dotenv');
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
dotenv.config();

const home = require('./src/routes/home');
const about = require('./src/routes/about');
const portfolio = require('./src/routes/portfolio');

const port = process.env.PORT;

const hbsx = handlebars.create({
  layoutsDir: __dirname + '/src/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/src/views/partials/'
})

app.set('view engine', 'hbs');
app.engine('hbs', hbsx.engine)

app.use('/static', express.static(__dirname + '/src'));
app.use('/static', express.static(__dirname + '/public'));

app.set('views', __dirname + '/src/views');
app.use('/', home);
app.use('/portfolio', portfolio);
app.use('/about', about);


app.listen(port, () => console.log(`App listening to port ${port}`));

module.exports = app;
