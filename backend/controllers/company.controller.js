module.exports = {
  async create(ctx) {
    try {
      const { name, city, address } = ctx.request.body;
      if (!name) throw (500, 'Please specify company name');
      if (!city) throw (500, 'Please specify company city');
      if (!address) throw (500, 'Please specify company address');
      company = await ctx.db.Company.create({
        name,
        city,
        address
      });
      ctx.body = {
        message: 'Company created!',
        success: true,
        company
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
      const companies = await ctx.db.Company.findAll({
        include: [
          { model: ctx.db.Job }
        ]
      });
      ctx.body = {
        message: 'All companies',
        success: true,
        companies
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
      const company = await ctx.db.Company.findOne({ where: { id }});
      if(!company) throw(400, 'No company found!');
      ctx.body = {
        message: 'Company',
        success: true,
        company
      }
    } catch (error) {
      console.error(error);
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  async destroy(ctx) {
    try {
      const { id } = ctx.params;
      const company = await ctx.db.Company.destroy({ where: { id }});
      if(!company) throw(400, 'No company found!');
      ctx.body = {
        message: 'Company',
        success: true,
        company
      }
    } catch (error) {
      console.error(error);
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { name, city, address } = ctx.request.body;
      const company = await ctx.db.Company.update({
        name,
        city,
        address
      },{ where: { id }});
      if(!company) throw(400, 'No company found!');
      ctx.body = {
        message: 'Company',
        success: true,
        company
      }
    } catch (error) {
      console.error(error);
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
};