import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
