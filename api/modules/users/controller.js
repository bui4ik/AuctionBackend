const User = require('../../models/User');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class UserController {
  async getUserInfo(req, res){
    try {
      const id = req.user.userId;
      const { name, surname, email } = await User.findById(id);
      res.send({
        name,
        surname,
        email
      });
    } catch (e) {
     res.status(400).send(e.message)
    }
  }

  async getFullUserInfo(req, res){
    try {
      const id = ObjectId(req.user.userId);
      const result = await User.aggregate([
        {
          $match: { _id: id }
        },
        { $project: { name: 1, surname: 1, email: 1} },
        {
          $lookup: {
            from: 'items',
            localField: '_id',
            foreignField: 'userId',
            as: 'items',
          }
        },
        { $project: { id: 0} },
      ]);
      res.send(result[0])
    }catch (e) {
      res.status(400).send(e.message)
    }
  }
}

module.exports = UserController;
