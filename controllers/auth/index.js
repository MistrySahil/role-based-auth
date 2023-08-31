const register = require('./register');
const login = require('./login');

const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json('Unauthorized')
    : next();
};

module.exports = {
  userLogin: login,
  userRegister: register,
  checkRole
}