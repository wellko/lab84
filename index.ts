import mongoose from 'mongoose';
import express from 'express';
import cors = require("cors");
import usersRouter from "./routers/users";
import tasksRouter from "./routers/tasks";
import config from "./config";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

const run = async () => {
	mongoose.set('strictQuery', false);
	await mongoose.connect(config.db);
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
	process.on('exit', () => {
		mongoose.disconnect();
	});
};

run().catch(console.error);