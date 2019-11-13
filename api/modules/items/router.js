const express = require('express');
const router = express.Router();
const ItemController = require('./controller');
const itemController = new ItemController();

function ItemsRouter() {
  router.route('/')
    .post(itemController.createNewItem.bind(itemController));
  router.route('/notonauction')
    .get(itemController.getNotOnAuctionItems.bind(itemController));
  router.route('/:id')
    .get(itemController.getItemById.bind(itemController))
    .put(itemController.updateItem.bind(itemController))
    .delete(itemController.deleteItem.bind(itemController));
  return router
}

module.exports = ItemsRouter;
