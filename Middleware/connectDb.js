import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */

  try {
    const db = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
  } catch (error) {
    console.log("error occured while connecting");
  }

  // connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
