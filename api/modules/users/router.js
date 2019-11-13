const express = require('express');
const router = express.Router();
const UserController = require('./controller');
const userController = new UserController();

function UsersRouter() {
  router.route('/profile')
    .get(userController.getUserInfo.bind(userController));
  router.route('/getfullinfo')
    .get(userController.getFullUserInfo.bind(userController));
  router.route('/')
    .get((req, res) => {
      res.send(req.user)
    });
  return router
}

module.exports = UsersRouter;
