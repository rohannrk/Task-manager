const Task = require('../models/Task')
const asyncHandler = require("express-async-handler");

//@desc Get all tasks
//@route GET /api/v1/tasks
//@access public
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

//@desc Create task
//@route POST /api/v1/tasks
//@access public
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  console.log(task);
  res.status(201).json({ task })
})

//@desc Get task
//@route GET /api/v1/tasks/:id
//@access public
const getTask = asyncHandler(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

//@desc Get all tasks
//@route GET /api/v1/tasks
//@access public
const deleteTask = asyncHandler(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

//@desc Get all tasks
//@route GET /api/v1/tasks
//@access public
const updateTask = asyncHandler(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}