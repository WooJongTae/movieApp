const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userForm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const FavoriteData = mongoose.model("FavoriteData", favoriteSchema);

module.exports = { FavoriteData };
