import Task from "../models/task.model.js";
import User from "../models/user.model.js";

// Crear una nueva tarea
export async function createTask (req, res) {
  
  try {

    const { title, description, assignedTo, timeSpent } = req.body;


    const task = new Task({ title, description, assignedTo, timeSpent });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las tareas
export async function getTasks (req, res) {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar el estado de una tarea
export async function updateTaskStatus (req, res) {
  

  try {

    const { taskId, status, timeSpent } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = status;
    if (timeSpent) task.timeSpent = timeSpent;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
