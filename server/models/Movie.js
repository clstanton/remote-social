const { Schema } = require('mongoose');

const movieSchema = new Schema(
  {
      release: [
        {
          type: String,
        },
      ],
      overview: {
        type: String,
        required: true,
      },
      movieId: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      vote: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
  }
);

module.exports = movieSchema;
