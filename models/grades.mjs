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

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;

// You can build indexing into your schemas.
// learnerSchema.index({ name: 1 });
// learnerSchema.index({ year: 1 });
// learnerSchema.index({ avg: 1 });
// learnerSchema.index({ campus: 1 });

// You can add methods to instances of a Mongoose model,
// which is simply a document object with its own instance methods.
// learnerSchema.methods.getPeers = function (cb) {
//   return mongoose
//     .model("Learner")
//     .find({ campus: this.campus, year: this.year }, cb);
// };

// You can also add static methods to a model for common tasks.
// learnerSchema.statics.findPassing = function () {
//   return this.find({ avg: { $gte: 70 } });
// };
// learnerSchema.statics.findByCampus = function (campus) {
//   return this.find({ campus });
// };

// As an additional convenience option, you can add query helpers
// to models using the schema.query method, allowing you to extend
// the chainable query builder API.
// learnerSchema.query.byName = function (name) {
//   return this.where({ name: new RegExp(name, "i") });
// };

// Virtuals allow us to get and set properties that are not
// stored in the MongoDB database. This is useful for a number
// of scenarios, like combining fields, repetitive processing,
// decomposing a value into multiple values for storage, etc.
// You cannot query with virtuals, since they are not
// stored in the database.
    

// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.

