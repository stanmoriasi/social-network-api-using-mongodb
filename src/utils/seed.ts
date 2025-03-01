import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { userData, thoughtData } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist


  let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  //await User.insertMany(userData);
  await User.create({
    userData
  });
    console.log("🚀 ~ connection.once ~ userData:", userData)

  await User.create(userData);

  let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck?.length) {
    await connection.dropCollection('thoughts');
  }
  
  //await User.insertMany(userData);
  await Thought.create({
    thoughtData
  });
    console.log("🚀 ~ connection.once ~ thought:", userData)
  
  await Thought.create(thoughtData);
  console.info('Seeding complete! 🌱');
  process.exit(0);

});





