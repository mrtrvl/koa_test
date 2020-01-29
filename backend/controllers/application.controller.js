module.exports = {
  async create(ctx) {
    try {
      const { firstName, lastName, email, JobId } = ctx.request.body;
      if (!firstName) throw (500, 'Please specify candidate firstname');
      if (!lastName) throw (500, 'Please specify candidate lastname');
      if (!email) throw (500, 'Please specify candidate email');
      const candidate = await ctx.db.Candidate.create({
        firstName,
        lastName,
        email
      });
      const application = await ctx.db.Application.create({
        JobId,
        CandidateId: candidate.id
      });
      ctx.body = {
        message: 'Candidate created!',
        success: true,
        candidate,
        application
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
      const candidates = await ctx.db.Candidate.findAll({
        include: [
          { model: ctx.db.Job }
        ]
      });
      ctx.body = {
        message: 'All candidates',
        success: true,
        candidates
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: error,
        success: false
      }
    }
  },
}