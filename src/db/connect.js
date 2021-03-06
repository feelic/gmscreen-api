import { MONGODB_URI, DB_NAME } from "../constants/index.js";
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

export default function connect() {
  return MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => {
    console.log("encountered a connection error:", err);
  });
}

export function runDBAction(action) {
  return connect()
    .then(client => {
      const db = client.db(DB_NAME);

      return action(db);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
