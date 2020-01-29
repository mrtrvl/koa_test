const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async comparePassword(password, hash) {
    try {
      const match = await bcrypt.compare(password, hash);
      return match ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}