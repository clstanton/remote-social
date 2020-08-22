const { Schema } = require('mongoose');

const movieSchema = new Schema(
  {
      authors: [
        {
          type: String,
        },
      ],
      description: {
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
      link: {
        type: String,
      },
      title: {
        type: String,
        required: true,
      },
  }
);

module.exports = movieSchema;
