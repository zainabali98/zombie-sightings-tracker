const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    enum: ['civilian', 'soldier', 'scientist', 'other' ]

  },
  contact: {
    phone: String,
    email: String
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sighting'
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
