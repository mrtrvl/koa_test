const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});
const {
  CompanyController,
  JobController,
  ApplicationController,
  UserController
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

 // Application routes
router
  .post('/user', UserController.create)
  .get('/user', UserController.findAll)
  .get('/user/:id', UserController.findOne)
  .post('/login/', UserController.login);
module.exports = router;