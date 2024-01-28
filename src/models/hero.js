import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the hero schema
const heroSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// create the hero model
const Hero = mongoose.model('Hero', heroSchema);

// export the hero model
export { Hero };