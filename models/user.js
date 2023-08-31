const { Schema, model } = require('mongoose');
const { ROLE } = require('../config/roles');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: [ROLE.user, ROLE.admin, ROLE.superadmin],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);