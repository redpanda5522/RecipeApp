// mongoClient.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_CONNECT_STRING;
const client = new MongoClient(uri);

let db = null;

async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("recipe-storage");
      console.log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err);
      throw err;
    }
  }
  return db;
}

module.exports = connectToDatabase;
