const express = require('express');
const authRouter = express.Router();
const AuthController = require('./controller');
const authController = new AuthController();

function AuthRouter() {
  authRouter.route('/register').post(authController.register.bind(authController));
  authRouter.route('/login').post(authController.login.bind(authController));
  authRouter.route('/refresh-tokens').post(authController.refreshTokens.bind(authController));
  return authRouter;
}

module.exports = AuthRouter;
