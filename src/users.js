const { MongoClient, ObjectId } = require("mongodb");

const { MONGO_USER, MONGO_PASSWORD } = process.env;

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb`;

const client = new MongoClient(mongoUrl);
const db = client.db("user-account");
const users = db.collection("users");

const getUserById = async (id) => {
  console.log("====> getUserById id:", id);
  const res = await users.findOne({ id: +id });
  console.log({ res });
  return res;
};

const insertUser = async (user) => {
  const res = await users.insertOne(user);
  console.log({ res });
};

const updateUser = async (user) => {
  const { id, ...data } = user;
  const filter = { id };
  const updateDoc = { $set: data };
  const res = await users.updateOne(filter, updateDoc);
  console.log({ res });
};

const logUsers = async () => {
  const cursor = users.find();
  console.log("------------------------------");
  console.log("users:");
  await cursor.forEach(console.log);
  console.log("------------------------------");
};

const deleteUser = async (objectId) => {
  const _id = new ObjectId(objectId);
  const query = { _id };
  const res = await users.deleteOne(query);
  console.log({ res });
};

module.exports = {
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  logUsers,
};

// await client.close();
