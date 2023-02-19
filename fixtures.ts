import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Task from "./models/Task";

const run = async () => {
	await mongoose.connect(config.db);
	const db = mongoose.connection;
	try {
		await db.dropCollection('tasks');
		await db.dropCollection('users');
	} catch (e) {
		console.log('Collections were not present, skipping drop...');
	}



	const [user1, user2] = await User.create({
		username: "first user",
		password: "firstPass",
		token: crypto.randomUUID()
	}, {
		username: "second user",
		password: "secondPass",
		token: crypto.randomUUID()
	});



	await Task.create({
		title: "first task",
		description: 'first description',
		status: 'in_progress',
		user: user1._id
	}, {
		title: "second task",
		description: 'second description',
		status: 'new',
		user: user1._id
	},{
		title: "third task",
		description: 'third description',
		status: 'complete',
		user: user1._id
	},{
		title: "fourth task",
		description: 'fourth description',
		status: 'in_progress',
		user: user2._id
	},{
		title: "fifth task",
		description: 'fifth description',
		status: 'new',
		user: user2._id
	},{
		title: "sixth task",
		description: 'sixth description',
		status: 'complete',
		user: user2._id
	});

	await db.close();
};

run().catch(console.error);