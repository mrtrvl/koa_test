const { JWTService } = require('../services');

module.exports = async (ctx, next) => {
  try {
    if (ctx.headers && ctx.headers.authorization) {
      const bearer = ctx.headers.authorization;
      const token = bearer.split(" ")[1];
      const decodedToken = await JWTService.verify(token);
      const user = await ctx.db.User.findOne({where: { id: decodedToken.id }});
      if (!user) throw(401, 'Unauthorized!');
      ctx.state.user = user.id;
      await next();
    } else {
      throw(401, 'Authorization header is missing!');
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      message: error,
      success: false
    }
  }
}