module.exports = {
  async create(ctx) {
    try {
      const { name, CompanyId } = ctx.request.body;
      if (!name) throw (500, 'Please specify job name!');
      if (!CompanyId) throw (500, 'Please specify company id!');
      const job = await ctx.db.Job.create({ name, CompanyId });
      ctx.body = {
        message: 'Job created!',
        success: true,
        job
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
      const jobs = await ctx.db.Job.findAll({
        include: [
          {
            model: ctx.db.Candidate
          }
        ]
      });
      ctx.body = {
        message: 'All jobs',
        success: true,
        jobs
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
      if (!id) throw (500, 'No id specified!');
      const job = await ctx.db.Job.findAll({ where: { id }});
      if (!job) throw (500, 'No job found!');
      ctx.body = {
        message: 'One job',
        success: true,
        job
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  async destroy(ctx) {
    
    try {
      const { id } = ctx.params;
      if (!id) throw (500, 'No id specified!');
      const job = await ctx.db.Job.destroy({ where: { id }});
      ctx.body = {
        message: 'Delete job',
        success: true,
        job
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  async update(ctx) {
    try {
      const { id } = ctx.params;
      if (!id) throw (500, 'No id specified!');
      const { name } = ctx.request.body;
      if (!name) throw (500, 'No name specified!');
      const job = await ctx.db.Job.update(
        {
          name: name
        },
        { where: { id }});
      ctx.body = {
        message: 'Update job',
        success: true,
        job
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  }
}