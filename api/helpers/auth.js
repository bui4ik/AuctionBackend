const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: 'access'
  };
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '15m' });
  const accessTokenInfo = jwt.decode(accessToken);
  return ({accessToken, expirationTime: accessTokenInfo.exp, userId: accessTokenInfo.userId})
};

const generateRefreshToken = async (userId) => {
  await Token.findOneAndDelete({userId});
  const token = new Token({userId});
  await token.save();
  const payload = {
    id: token._id,
    type: 'refresh'
  };
  return  jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' });
};

const replaceDbRefreshToken = async (userId) => {
  await Token.findOneAndDelete({userId});
  const token = new Token({userId});
  console.log(token._id);
  await token.save();
};

const updateTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);
  return ({
    accessToken,
    refreshToken,
  })
};

module.exports = {
  updateTokens
};

