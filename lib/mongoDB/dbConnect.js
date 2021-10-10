import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB;

const connection = { isConnected: false };

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
