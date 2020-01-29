const {
  UtilService,
  JWTService
} = require('../services');
const jwtExpireTime = 3600;

module.exports = {
  /**
   * @api {post} /api/user Create new User
   * @apiGroup User
   * @apiName createUser
   * @apiDescription Authenticated User can create new User
   * @apiParam {String} email E-mail is required
   * @apiParam {String} password Password is required
   * @apiHeader {String} authorization Users authorization Bearer token
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer usersTokenValue"
   *  }
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "User created!",
   *   "success": true,
   *   "user": "john@john.com"
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500
   * {
   *   "error": "Please specify user email!",
   *   "success": false
   * }
   */
  
  async create(ctx) {
    try {
      console.log(ctx.request.body);
      const { email, password } = ctx.request.body;
      if (!email) throw (500, 'Please specify user email!');
      if (!password) throw (500, 'Please specify user password!');
      const encryptedPassword = await UtilService.hashPassword(password);
      const user = await ctx.db.User.create({
        email,
        password: encryptedPassword
      });
      ctx.body = {
        message: 'User created!',
        success: true,
        user: user.email
      }
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  /**
   * @api {get} /api/user Request all Users
   * @apiGroup User
   * @apiName findAll
   * @apiDescription Authenticated User can view all Users
   * @apiHeader {String} authorization Users authorization Bearer token
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer usersTokenValue"
   *  }
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "All users!",
   *   "success": true,
   *   "users": []
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500
   * {
   *   "error": ""
   * }
   */
  async findAll(ctx) {
    try {
      const users = await ctx.db.User.findAll({
        attributes: ['id', 'email']
      });
      ctx.body = {
        message: 'All users',
        success: true,
        users
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  /**
   * @api {get} /api/user/:id Request User information with User ID
   * @apiGroup User
   * @apiName findOne
   * @apiParam {Number} id ID is required
   * @apiDescription Authenticated User can view specified User
   * @apiHeader {String} authorization Users authorization Bearer token
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer usersTokenValue"
   *  }
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "User",
   *   "success": true,
   *   "user": {
   *      "id": 1
   *      "email": "john@john.com"
   *    }
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400
   * {
   *   "error": "No user found!",
   *   "success": false
   * }
   */
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const user = await ctx.db.User.findOne({
        attributes: ['id', 'email']
      },
      { where: { id }});
      if(!user) throw(400, 'No user found!');
      ctx.body = {
        message: 'User',
        success: true,
        user
      }
    } catch (error) {
      ctx.status = 400;
      console.error(error);
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
    /**
   * @api {post} /api/login User login
   * @apiGroup User
   * @apiName login
   * @apiParam {String} email User e-mail is required
   * @apiParam {String} password User password is required
   * @apiDescription User can login into application
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "message": "Login permitted",
   *   "success": true,
   *   "token": "newTokenValueForUser"
   * }
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 400
   * {
   *   "error": "No user found!",
   *   "success": false
   * }
   */
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;
      if (!email) throw (500, 'Please specify user email');
      if (!password) throw (500, 'Please specify user password');
      const user = await ctx.db.User.findOne({ where: { email }});
      if(!user) throw(400, 'No user found!');
      const loggedIn = await UtilService.comparePassword(password, user.password);
      if(!loggedIn) throw(400, 'Not permitted!');
      const token = await JWTService.sign({ id: user.id }, jwtExpireTime);
      if (!token) throw(500, 'No token generated!');
      ctx.body = {
        message: 'Login permitted',
        success: true,
        token
      }
    } catch (error) {
      ctx.status = 500;
      console.error(error);
      ctx.body = {
        message: error,
        success: false
      }
    }
  }
}