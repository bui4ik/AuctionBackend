const User = require('../../models/User');

class AuthService {
  static async createNewUser({ name, surname, email }, hashPassword) {
    const user = new User({
      name,
      surname,
      email,
      password: hashPassword,
    });
    return await user.save();
  }

  static findUserByEmail(email) {
    return User.findOne({ email: email });
  }
}

module.exports = AuthService;
