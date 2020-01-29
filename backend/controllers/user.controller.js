module.exports = {
  async create(ctx) {
    try {
      const { email, password } = ctx.request.body;
      if (!email) throw (500, 'Please specify user email');
      if (!password) throw (500, 'Please specify user password');
      const user = await ctx.db.User.create({
        email,
        password
      });
      ctx.body = {
        message: 'User created!',
        success: true,
        user
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  async findAll(ctx) {
    try {
      const users = await ctx.db.User.findAll();
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
      const user = await ctx.db.User.findOne({ where: { id }});
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
  }
}