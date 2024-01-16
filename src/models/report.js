import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the report schema
const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create the report model
const Report = mongoose.model('Report', reportSchema);

// export the report model
export { Report };