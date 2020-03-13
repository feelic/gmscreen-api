import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as actions from "./db/actions.js";

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    .then((data) => {
      res.json({data: data.ops[0]});
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
      return findCharacter(charId);
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

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

function handleError(err) {
  this.json({ error: "API encountered an error", details: err });
}
