const Auction = require('../../models/Auction');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class AuctionController {
  async createAuction(req, res){
    try {
      const hostId = req.user.userId;
      const { title, startPrice, minBid, itemId, startTime, endTime } = req.body;
      const newAuction = new Auction({
        title,
        startPrice,
        minBid,
        hostId,
        itemId,
        startTime,
        endTime
      });
      res.send(await newAuction.save())
    } catch (e) {
      res.status(400).send('Cannot create new auction')
    }
  }

  async getUserAuctions(req, res){
    try {
      const id = ObjectId(req.user.userId);
      const result = await Auction.aggregate([
        {
          $match: {hostId: id}
        }
      ]);
      res.send(result)
    } catch (e) {
      res.status(400).send('Something goes wrong when fetching users')
    }
  }
}

module.exports = AuctionController;
