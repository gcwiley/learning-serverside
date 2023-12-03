import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create the task schema
const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      // data stored in owner is going to be a ObjectID
      type: Schema.Types.ObjectId,
      // you must provide an owner for the task
      required: true,
      // ref is short for reference to another model
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// create the task model
const Task = mongoose.model('Task', taskSchema);

// export the task model
export { Task };
