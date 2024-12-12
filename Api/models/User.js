const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
    },

    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    personalInfo: {
      type: Object,
    },
    professionalInfo: {
      type: Object,
    },
    bankAccountDetails: {
      type: Object,
    },
    appointmentFee: {
      type: Number,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    profileViews: {
      type: Number,
    },
    startAvailabilityTime: {
      type: String,
      default: "09:00:00",
    },
    endAvailabilityTime: {
      type: String,
      default: "21:00:00",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
