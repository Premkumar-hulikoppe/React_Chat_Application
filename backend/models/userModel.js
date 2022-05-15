const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    versionKeys: false,
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// schema for a user has
// name
// email
// password
// profile
