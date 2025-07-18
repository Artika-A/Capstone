const express = require("express");
const Task = require("../models/Task");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`)
  next();
})

router.use(verifyToken);

router.post("/", async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json(task);
});


router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});


router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).send("Task not found");
  res.json(task);
});


router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.sendStatus(204);
});

module.exports = router;