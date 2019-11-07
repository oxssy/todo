import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import Promise from 'bluebird';
import route from './routes';

global.Promise = Promise;

const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/html`);
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));
app.use(session({
  cookie: { secure: process.env.IS_HTTPS },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'LetThereBeLight',
}));

route(app);

const port = process.env.PORT || 3333;
app.listen(port, () => { console.log(`We are live on ${port}`); });
