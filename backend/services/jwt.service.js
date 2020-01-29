require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async sign(payload, expiresIn) {
    try {
      const token = await jwt.sign({
        data: payload
      }, JWT_SECRET, {
        expiresIn: expiresIn
      });
      return token;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async verify(token) {
    try {
      const verify = await jwt.verify(token, JWT_SECRET);
      if (!verify) throw('401', 'Unauthorized!');
      return verify.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}