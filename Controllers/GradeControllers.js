import Grade from '../models/grades.mjs'; 


// Create a single grade entry
router.post("/", async (req, res) => {
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  try {
    const result = await Grade.create(newDocument);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(req.params.id, {
      $push: { scores: req.body }
    }, { new: true });
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(req.params.id, {
      $pull: { scores: req.body }
    }, { new: true });
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get route for backwards compatibility
router.get("/student/:id", (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    let query = { learner_id: Number(req.params.id) };
    if (req.query.class) query.class_id = Number(req.query.class);

    const result = await Grade.find(query);
    if (!result.length) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({ learner_id: Number(req.params.id) });
    if (!result.deletedCount) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  try {
    let query = { class_id: Number(req.params.id) };
    if (req.query.learner) query.learner_id = Number(req.query.learner);

    const result = await Grade.find(query);
    if (!result.length) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  try {
    const result = await Grade.updateMany(
      { class_id: Number(req.params.id) },
      { $set: { class_id: req.body.class_id } }
    );
    if (!result.matchedCount) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({ class_id: Number(req.params.id) });
    if (!result.deletedCount) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
