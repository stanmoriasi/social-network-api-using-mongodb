import connection from '../config/connection.js';
import { User } from '../models/index.js';
import { userData } from './data.js';

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
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
