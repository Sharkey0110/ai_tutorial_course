import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached){
  cached = (global as any).mongoose = { conn: null, promise: null}
}

export default async function connectToDB(){
  if(cached.conn) return cached.conn;

  if(!MONGO_URI) throw new Error('Missing MONGODB connection')

  cached.promise = cached.promise || mongoose.connect(MONGO_URI, { dbName: 'imaginify', bufferCommands: false})
  cached.conn = await cached.promise;

  return cached.conn;
}