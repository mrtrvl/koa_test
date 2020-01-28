const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'Hello world!'
  }
});

module.exports = router;