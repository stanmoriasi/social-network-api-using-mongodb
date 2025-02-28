import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thought: string[];
 }

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    thought: [String]
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

// Create a virtual property `fullName` that gets and sets the user's full name



// Initialize our User model
const User = model('user', userSchema);
console.log("🚀 ~ User:", User)

export default User
