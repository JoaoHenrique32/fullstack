const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, userId: req.user.id });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, status, dataConclusao } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, description, status, dataConclusao },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json({ message: 'Tarefa removida' });
});

module.exports = router;
