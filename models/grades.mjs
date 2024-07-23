import mongoose from "mongoose";

// Define the schema for grades.
// Mongoose will add the _id property to your schemas by default.

const scoreSchema = new mongoose.Schema({
  type: String,
  score: Number,
});
const gradeSchema = new mongoose.Schema({
  student_id: Number,
  class_id: Number,
  scores: [scoreSchema],
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
