const jwt = require('jsonwebtoken');

function privateRoute(req, res, next) {
  try {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied');
    const accessToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if(accessToken.type !== 'access') {
      return res.status(401).send('Invalid token')
    }
    req.user = accessToken;
    next()
  } catch (e) {
    if(e instanceof jwt.TokenExpiredError) {
      return res.status(401).send('Token expired')
    } else if (e instanceof jwt.JsonWebTokenError){
      res.status(401).send('Invalid token')
    }
    res.status(400).send(e.message)
  }
}

module.exports = privateRoute;

