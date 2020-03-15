import * as actions from "../db/actions.js";

export function readAllCharacters(req, res) {
  const campaign = (req.query && req.query.campaign);
  const filters = {campaign};

  actions.findCharacters(filters).then(data => {
    res.json({
      data: data.reduce((chars, char) => {
        return { ...chars, [char._id]: char };
      }, {})
    });
  });
}
export function createCharacter(req, res) {
  const character = req.body;

  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(401)
  //     .json({
  //       status: "error",
  //       details: "you need to be logged in to use this route"
  //     });
  // }

  actions
    .insertCharacters([character])
    .then(data => {
      res.json({ data: data.ops[0] });
    })
    .catch(err => res.status(500).send(err));
}
export function readSingleCharacter(req, res) {
  const charId = req.params.charId;

  actions
    .findCharacter(charId)
    .then(data => {
      if (!data[0]) {
        return res.status(404).json({
          status: "error",
          details: `Could not find character with id ${charId}`
        });
      }
      res.json({ data: data[0] });
    })
    .catch(err => res.status(500).send(err));
}
export function updateCharacter(req, res) {
  const charId = req.params.charId;
  const character = req.body;

  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(401)
  //     .json({
  //       status: "error",
  //       details: "you need to be logged in to use this route"
  //     });
  // }

  actions
    .updateCharacter(charId, character)
    .then(() => {
      return actions.findCharacter(charId);
    })
    .then(data => {
      res.json({ data: data[0] });
    })
    .catch(err => res.status(500).send(err));
}

export function deleteCharacter(req, res) {
  const charId = req.params.charId;

  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(401)
  //     .json({
  //       status: "error",
  //       details: "you need to be logged in to use this route"
  //     });
  // }

  actions
    .removeCharacter(charId)
    .then(data => {
      res.json({ data });
    })
    .catch(err => res.status(500).send(err));
}
