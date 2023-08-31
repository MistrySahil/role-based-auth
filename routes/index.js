const router = require('express').Router();
const { ROLE } = require('../config/roles');
const { body } = require('express-validator');

// Bring in the User Registration function
const {
  userLogin,
  checkRole,
  userRegister,
} = require('../controllers/auth');

const userAuth = require('../middlewares/userAuth');

router.get("/", (req, res) => {
  return res.send("Auth service running...");
});

// Users Registeration Route
router.post("/signup", [
  body('email', 'Email is required').notEmpty(),
  body('password', 'Password is required').notEmpty().isLength({ min: 6 }).matches(/(?=.*\d*)(?=.*[a-z])(?=.*\W)/).trim(),
], async (req, res) => {
  await userRegister(req, ROLE.user, res);
});

// Admin Registration Route
router.post("/signup-admin", [
  body('email', 'Email is required'),
  body('password', 'Password is required').isLength({ min: 6 }).matches(/(?=.*\d*)(?=.*[a-z])(?=.*\W)/).trim(),
], async (req, res) => {
  await userRegister(req, ROLE.admin, res);
});

// Super Admin Registration Route
router.post("/signup-superadmin", [
  body('email', 'Email is required'),
  body('password', 'Password is required').isLength({ min: 6 }).matches(/(?=.*\d*)(?=.*[a-z])(?=.*\W)/).trim(),
], async (req, res) => {
  await userRegister(req, ROLE.superadmin, res);
  console.log('user admin signup successfully');
});

// Users Login Route
router.post("/login", [
  body('email', 'Email is required'),
  body('password', 'Password is required').isLength({ min: 6 }),
], async (req, res) => {
  await userLogin(req, ROLE.user, res);
  console.log('user login successfully');
});

// Admin Login Route
router.post("/login-admin", [
  body('email', 'Email is required'), 
  body('password', 'Password is required').isLength({ min: 6 }),
], async (req, res) => {
  await userLogin(req, ROLE.admin, res);
  console.log('admin login successfully');
});

// Super Admin Login Route
router.post("/login-superadmin", [
  body('email', 'Email is required').normalizeEmail(),
  body('password', 'Password is required').isLength({ min: 6 }),
], async (req, res) => {
  await userLogin(req, ROLE.superadmin, res);
  console.log('super admin login successfully');
});

// Super Admin Protected Route
router.get("/super-admin", async (req, res) => {
  return res.json("Hello Super Admin");
});

// Users Protected Route
router.get("/user", userAuth, () => checkRole([ROLE.user]), async (req, res) => {
  return res.status(200).json({ type: ROLE.user, user: serializeUser(req.user) });
});

// Admin Protected Route
router.get("/admin", userAuth, () => checkRole([ROLE.admin]), async (req, res) => {
  return res.status(200).json({ type: "admin", user: serializeUser(req.user) });
});

module.exports = router;