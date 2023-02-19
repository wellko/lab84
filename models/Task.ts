import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => User.findById(value),
			message: 'Artist does not exist!',
		}
	}
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;