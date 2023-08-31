const jwt = require('jsonwebtoken');

const userAuth = (req, role, res) => {

  const barerHeader = req.headers['authorization'];

  if(barerHeader) {
    const barer = barerHeader.spilt(' ');
    const barertoken = barer[1];
    req.token = barertoken;

    jwt.verify(barertoken, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if(err) {
          switch (err.name) {
            case 'TokenExpiredError':
              return res.status(403).json({
                message: 'accessToken expired',
                success: false
              });
            default:
              return res.status(403).json({
                message: 'accessToken expired',
                success: false
              });
          }
      }
      return res.redirect('/'); 
    });
  } 
}
module.exports = userAuth;