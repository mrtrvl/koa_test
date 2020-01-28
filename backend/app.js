require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const db = require('./models');
const router = require('./routes');

db.sequelize.sync()
  .then(() => {console.log('Database models synced!')})
  .catch(error => {
    console.error(error);
  });

const app = new Koa();

const PORT = process.env.PORT || 3000;
app.context.db = db;
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT);
console.log(`App is running on port: ${ PORT }`);