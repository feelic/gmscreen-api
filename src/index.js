import express from "express";
import cors from "cors";
import uuid from 'uuid';
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import * as actions from "./db/actions.js";
import path from 'path';

const app = express();
const port = 3000;
const uuidv4 = uuid.v4;

app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    createParentPath: true
  })
);

// READ ALL CHARACTERS
app.get("/characters", (req, res) => {
  const filters = (req.body && req.body.filters) || {};

  actions.findCharacters(filters).then(data => {
    res.json({
      data: data.reduce((chars, char) => {
        return { ...chars, [char._id]: char };
      }, {})
    });
  });
});

// CREATE NEW CHARACTER
app.post("/character", (req, res) => {
  const character = req.body;

  actions
    .insertCharacters([character])
    .then(data => {
      res.json({ data: data.ops[0] });
    })
    .catch(handleError.bind(res));
});

// READ SINGLE CHARACTER
app.get("/character/:charId", (req, res) => {
  const charId = req.params.charId;

  actions
    .findCharacter(charId)
    .then(data => {
      if (!data[0]) {
        return res.json({
          error: `Could not find character with id ${charId}`
        });
      }
      res.json({ data: data[0] });
    })
    .catch(handleError.bind(res));
});

// UPDATE CHARACTER
app.post("/character/:charId", (req, res) => {
  const charId = req.params.charId;
  const character = req.body;

  actions
    .updateCharacter(charId, character)
    .then(() => {
      return actions.findCharacter(charId);
    })
    .then(data => {
      res.json({ data: data[0] });
    })
    .catch(handleError.bind(res));
});

// DELETE CHARACTER
app.delete("/character/:charId", (req, res) => {
  const charId = req.params.charId;

  actions
    .removeCharacter(charId)
    .then(data => {
      res.json({ data });
    })
    .catch(handleError.bind(res));
});
app.post("/image-upload", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const image = req.files[0];
      const extension = path.extname(image.name);
      const newName = uuidv4() + extension;
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      image.mv("./public/images/" + newName);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: newName,
          mimetype: image.mimetype,
          size: image.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

function handleError(err) {
  this.status(500).json({ error: "API encountered an error", details: err });
}
