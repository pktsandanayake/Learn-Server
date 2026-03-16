import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
});

export default mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);
