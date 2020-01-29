const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});
const {
  CompanyController,
  JobController,
  ApplicationController
 } = require('../controllers');

// Company routes
router
  .post('/company', CompanyController.create)
  .get('/company', CompanyController.findAll)
  .get('/company/:id', CompanyController.findOne)
  .delete('/company/:id', CompanyController.destroy)
  .put('/company/:id', CompanyController.update);

// Job routes
router
  .post('/job', JobController.create)
  .get('/job', JobController.findAll)
  .get('/job/:id', JobController.findOne)
  .delete('/job/:id', JobController.destroy)
  .put('/job/:id', JobController.update);

// Application routes
router
 .post('/candidate', ApplicationController.create)
 .get('/candidate', ApplicationController.findAll);
module.exports = router;