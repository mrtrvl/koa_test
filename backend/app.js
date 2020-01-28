require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router({
  prefix: '/api'
});

const PORT = process.env.PORT || 3000;

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'Hello world!'
  }
});

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT);
console.log(`App is running on port: ${ PORT }`);