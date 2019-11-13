const express = require('express');
const authRouter = express.Router();
const AuthController = require('./controller');
const authController = new AuthController();

function RefreshTokenRouter() {
  authRouter.route('/').post(authController.refreshTokens.bind(authController));
  return authRouter;
}

module.exports = RefreshTokenRouter;
