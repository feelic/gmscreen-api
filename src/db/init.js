import connect from "./connect.js";
import CHARACTER_SCHEMA from "../constants/characters-schema.js";
import { DB_NAME } from "../constants/index.js";

function initDB() {
  connect().then(client => {
    const db = client.db(DB_NAME);

    db.createCollection("characters", CHARACTER_SCHEMA).then(() => {
      client.close();
    });
  });
}

initDB();
