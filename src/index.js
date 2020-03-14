import express from "express";
import cors from "cors";
import uuid from "uuid";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import * as actions from "./db/actions.js";
import path from "path";
import * as characters from "./api/characters";
import uploadImage from "./api/image-upload";

const app = express();
const port = 3000;
const uuidv4 = uuid.v4;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.get("/characters", characters.readAllCharacters);
app.post("/character", characters.createCharacter);
app.get("/character/:charId", characters.readSingleCharacter);
app.post("/character/:charId", characters.updateCharacter);
app.delete("/character/:charId", characters.deleteCharacter);
app.post("/image-upload", uploadImage);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

function handleError(err) {
  this.status(500).json({ error: "API encountered an error", details: err });
}
