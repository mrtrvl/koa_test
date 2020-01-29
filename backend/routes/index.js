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
const isAuthenticated = require('../polices/isAuthenticated');
// Company routes
router
  .post('/company', isAuthenticated, CompanyController.create)
  .get('/company', isAuthenticated, CompanyController.findAll)
  .get('/company/:id', isAuthenticated, CompanyController.findOne)
  .delete('/company/:id', isAuthenticated, CompanyController.destroy)
  .put('/company/:id', isAuthenticated, CompanyController.update);

// Job routes
router
  .post('/job', isAuthenticated, JobController.create)
  .get('/job', isAuthenticated, JobController.findAll)
  .get('/job/:id', isAuthenticated, JobController.findOne)
  .delete('/job/:id', isAuthenticated, JobController.destroy)
  .put('/job/:id', isAuthenticated, JobController.update);

// Application routes
router
 .post('/candidate', ApplicationController.create)
 .get('/candidate', ApplicationController.findAll);

 // Application routes
router
  .post('/user', UserController.create)
  .get('/user', isAuthenticated, UserController.findAll)
  .get('/user/:id', isAuthenticated, UserController.findOne)
  .post('/login/', UserController.login);
module.exports = router;