module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    const status = error.statusCode || error.code || 500;
    const message = error.message;
    ctx.status = status;
    ctx.body = {
      message,
      success: false
    }
  }
};
