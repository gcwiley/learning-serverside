import mongoose from 'mongoose';
const { Schema } = mongoose;

// create the image schema
const imageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create the image model
const Image = mongoose.model('Image', imageSchema);

// export the image model
export { Image };
