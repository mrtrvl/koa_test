const {
  UtilService,
  JWTService
} = require('../services');
const jwtExpireTime = 3600;

module.exports = {
  /**
   * @api {post} /user
   * @apiGroup User
   * @apiName createUser
   * @apiParam {String} email
   * @apiParam {String} password
   */
  async create(ctx) {
    try {
      console.log(ctx.request.body);
      const { email, password } = ctx.request.body;
      if (!email) throw (500, 'Please specify user email');
      if (!password) throw (500, 'Please specify user password');
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
   * @api {get} /user
   * @apiGroup User
   * @apiName findAll
   * @apiParam {Number} id
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
   * @api {get} /user/:id Users unique ID.
   * @apiGroup User
   * @apiName findAll
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
      ctx.status = 500;
      console.error(error);
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
    /**
   * @api {post} /login
   * @apiGroup User
   * @apiName login
   * @apiParam {String} email
   * @apiParam {String} password
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