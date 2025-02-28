import { Schema, Document, model, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thought: string;
  friends: ObjectId[];
  fullName: string;
 }

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    thought: String,
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'friends',
      },
    ],
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
userSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.username} ${this.email}`;
});



// Initialize our User model
const User = model('user', userSchema);

export default User
