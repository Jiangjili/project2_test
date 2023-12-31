const path = require('path');
const express = require('express');
//const session = require('express-session');
const exphbs = require('express-handlebars');
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'secret',
//   cookie: {},
//   resave: false,  
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

//app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening at port ' +PORT));
});

