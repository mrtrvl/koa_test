const { UtilService } = require('../services');

module.exports = {
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
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;
      if (!email) throw (500, 'Please specify user email');
      if (!password) throw (500, 'Please specify user password');
      const user = await ctx.db.User.findOne({ where: { email }});
      if(!user) throw(400, 'No user found!');
      const loggedIn = await UtilService.comparePassword(password, user.password);
      if(!loggedIn) throw(400, 'Not permitted!');
      ctx.body = {
        message: 'Login permitted',
        success: true,
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