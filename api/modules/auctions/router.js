const express = require('express');
const router = express.Router();
const AuctionController = require('./controller');
const auctionController = new AuctionController();

function AuctionRouter() {
  router.route('/')
    .get(auctionController.getUserAuctions.bind(auctionController))
    .post(auctionController.createAuction.bind(auctionController));
  return router
}

module.exports = AuctionRouter;
