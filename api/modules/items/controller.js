const Item = require('../../models/Item');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class ItemController {
  async getItemById(req, res){
    try {
      const item = await Item.findById(req.params.id);
      res.send(item)
    } catch (e) {
      res.status(400).send('Something wrong with item')
    }
  };

  async createNewItem(req, res){
    try {
      const id = req.user.userId;
      const { name, description, price } = req.body;
      const newItem = new Item({
        name,
        description,
        price,
        userId: id,
      });
      res.send(await newItem.save());
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async updateItem(req, res){
    try {
      const updatedItem = await Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
      res.send(updatedItem)
    }catch (e) {
      res.status(400).send('Cannot update item')
    }
  }

  async deleteItem(req, res){
    try {
      await Item.deleteOne({_id: req.params.id});
      res.send('Successfully deleted')
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async getNotOnAuctionItems(req, res){
    try {
      const id = ObjectId(req.user.userId);
      const items = await Item.aggregate([
        {
          $match: { userId: id, onAuction: false}
        },
      ]);
      res.send(items)
    } catch (e) {
      res.status(400).send('Something goes wrong when fetching items')
    }
  }
}

module.exports = ItemController;
