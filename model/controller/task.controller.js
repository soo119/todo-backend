// task.controller.js
const Task = require("../Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};


taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isComplete },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ status: "fail", error: "할일을 찾을 수 없습니다." });
    }

    res.status(200).json({ status: "ok", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};


taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ status: "fail", error: "할일을 찾을 수 없습니다." });
    }

    res.status(200).json({ status: "ok", data: deletedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
