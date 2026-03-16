import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "pending" },
  priority: { type: String, default: "low" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);
