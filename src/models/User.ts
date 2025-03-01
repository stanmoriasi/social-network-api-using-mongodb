import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thought: string[];
  friends: string[];
 }

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    thought: [{type: Schema.Types.ObjectId, ref: 'Thought'}], // Array of _id values referencing the Thought model
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}], // Array of _id values referencing the User model
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets and sets the user's full name
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});


// Initialize our User model
const User = model('user', userSchema);
console.log("🚀 ~ User:", User)

export default User
