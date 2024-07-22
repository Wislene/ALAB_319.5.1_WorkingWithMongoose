import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config();

// const client = new MongoClient(process.env.ATLAS_URI);

// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }

// const options = { dbName: 'sample_training' // Specify the database name here }; mongoose.connect(dbURI, options) .then(() => console.log('MongoDB connected...')) .catch(err => console.error('MongoDB connection error:', err)); export default mongoose.connection;




// let db = conn.db("sample_training");

let db = mongoose.connect(process.env.ATLAS_URI).then((con) => {console.log('connected to ${con.connection?.name}')
})

console.log(db)

export default db;
