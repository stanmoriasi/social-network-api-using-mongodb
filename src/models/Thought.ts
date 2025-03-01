import { Schema, Document, model } from 'mongoose';

interface IThought extends Document {
thoughtText: string;
createdAt: Date;
username: string;
reactions: [String]
}

const thoughtSchema = new Schema<IThought>({
thoughtText: {
type: String,
required: false,
trim: true,
maxlength: [280, 'Thought must be less than 280 characters!'],
},
createdAt: {
type: Date,
default: Date.now,
},
username: {
type: String,
required: false,
trim: true,
},
reactions: []
},

);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
return this.reactions.length;
});
// Initialize our Thought model
const Thought = model('thought', thoughtSchema);
export default Thought;