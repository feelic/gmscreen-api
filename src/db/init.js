import connect from "./connect.js";
import SCHEMA from "../constants/characters-schema.js";
import { DB_NAME } from "../constants/index.js";

function initDB() {
  connect().then(client => {
    const db = client.db(DB_NAME);

    db.createCollection("characters", schema).then(() => {
      client.close();
    });
  });
}

initDB();
