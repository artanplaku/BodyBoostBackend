const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
  
    if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
          return res.sendStatus(403);
        }
  
        req.userId = decoded.id;
        next();
      });
    } else {
      return res.sendStatus(401);
    }
}

module.exports = checkToken;