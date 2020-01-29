'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    name: DataTypes.STRING
  }, {});
  Job.associate = function(models) {
    Job.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false
      }
    }),
    Job.belongsToMany(models.Candidate, {
      through: 'Application'
    });
  };
  return Job;
};