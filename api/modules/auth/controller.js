const jwt = require('jsonwebtoken');
const { createPasswordHash, comparePasswordHash } = require('../../helpers/bcrypt');
const { createNewUser, findUserByEmail } = require('./service');
const { registerValidation, loginValidation } = require('../../validation/validation');
const { updateTokens } = require('../../helpers/auth');
const Token = require('../../models/Token');

class AuthController {
  async register(req, res) {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await findUserByEmail(req.body.email);
    if (emailExist) return res.status(400).send('Email already exists');

    const hashPassword = await createPasswordHash(req.body.password);

    try {
      const { _id, name, surname, email } = await createNewUser(req.body, hashPassword);
      res.send({
        id: _id,
        name,
        surname,
        email,
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async login(req, res) {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(400).send('Email is not found');

    const validPass = await comparePasswordHash(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    const tokens = await updateTokens(user._id);
    res.send(tokens);
  }

  async refreshTokens(req, res) {
    const { refreshToken } = req.body;
    try {
      const payload = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
      if (payload.type !== 'refresh') {
        return res.status(400).send('Invalid token');
      }
      const token = await Token.findOne({ _id: payload.id });
      if (token === null) {
        throw new Error('Invalid Token');
      }
      const tokens = await updateTokens(token.userId);
      res.send(tokens);
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return res.status(400).send('Token expired');
      } else if (e instanceof jwt.JsonWebTokenError) {
        return res.status(400).send('Invalid token');
      }
      res.status(400).send(e.message);
    }
  }
}

module.exports = AuthController;
