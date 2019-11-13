const authRouter = require('../modules/auth/auth.router');
const refreshToken = require('../modules/auth/refreshToken.router');
const usersRouter = require('../modules/users/router');
const itemsRouter = require('../modules/items/router');
const auctionRouter = require('../modules/auctions/router');
const privateRoute = require('./privateRoute');

function rootRouter(app) {
  app.use('/api/auth', authRouter());
  app.use('/api/users', privateRoute, usersRouter());
  app.use('/api/refresh-tokens', privateRoute, refreshToken());
  app.use('/api/items', privateRoute, itemsRouter());
  app.use('/api/auctions', privateRoute, auctionRouter());
}

module.exports = rootRouter;
