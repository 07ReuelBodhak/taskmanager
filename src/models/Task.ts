import mongoose, { Document, Schema, Model } from "mongoose";

export interface TSK extends Document {
  title: string;
  description: string;
  created: string;
  dueDate: string;
  completionDate: string;
  status: string;
  user: Schema.Types.ObjectId;
  formatDate(): Promise<string>;
}

const taskSchema = new Schema<TSK>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: String, required: true },
  completionDate: { type: String },
  dueDate: { type: String, required: true },
  status: { type: String, required: true, default: "on going" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

taskSchema.methods.formatDate = function () {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}-${month}-${year}`;
};
const TaskModel: Model<TSK> = mongoose.model<TSK>("Task", taskSchema);

export default TaskModel;
