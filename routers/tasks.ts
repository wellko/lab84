import express from "express";
import auth, { RequestWithUser } from '../middleware/auth';
import Task from "../models/Task";
import {TaskType} from "../types";

const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req, res) => {
	const user = (req as RequestWithUser).user;
	const taskData = {
		title: req.body.title,
		description: req.body.description? req.body.description : '',
		status: req.body.status,
		user: user._id,
	}
	const newTask = new Task(taskData);
	try {
		await newTask.save();
		return res.send(newTask);
	}catch (error){
		return res.status(400).send(error);
	}
});

tasksRouter.get('/', auth, async (req, res) => {
	const user = (req as RequestWithUser).user;
	try {
		const tasks = await Task.find({user: user._id})
		return res.send(tasks);
	} catch {
		return res.sendStatus(500);
	}
});

tasksRouter.delete('/:id', auth, async (req, res) => {
	const user = (req as RequestWithUser).user;
	try {
		const task = await Task.findOne({_id: req.params.id}) as TaskType
		if (task.user.toString() === user._id.toString()){
			await Task.deleteOne(task);
			return res.send(task);
		}
		return res.status(403).send({error: "no permission"})
	}catch {
		return res.sendStatus(500);
	}
});

tasksRouter.put('/:id', auth, async (req,res)=>{
	const user = (req as RequestWithUser).user;
	const taskData = {
		title: req.body.title,
		description: req.body.description? req.body.description : '',
		status: req.body.status,
		user: user._id,
	}
	try {
		const task = await Task.findOne({_id: req.params.id}) as TaskType
		if (task.user.toString() === user._id.toString()){
			await Task.updateOne(task, taskData);
			return res.send(taskData);
		}
		return res.status(403).send({error: "no permission"})
	}catch {
		return res.sendStatus(500);
	}
})

export default tasksRouter;