import { MONGODB_URI, DB_NAME } from "../constants/index.js";
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

export default function connect() {
  return MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => {
    console.log('encountered a connection error')
  });
}

export function runDBAction (action) {
  return connect()
    .then(client => {
      const db = client.db(DB_NAME);
      const collection = db.collection("documents");

      return action(collection);
    })
    .then((res) => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
