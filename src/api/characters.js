export function readAllCharacters (req, res) {
  const filters = (req.body && req.body.filters) || {};

  actions.findCharacters(filters).then(data => {
    res.json({
      data: data.reduce((chars, char) => {
        return { ...chars, [char._id]: char };
      }, {})
    });
  });
}
export function createCharacter (req, res) {
  const character = req.body;

  actions
    .insertCharacters([character])
    .then(data => {
      res.json({ data: data.ops[0] });
    })
    .catch(handleError.bind(res));
}
export function readSingleCharacter (req, res) {
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
}
export function updateCharacter (req, res) {
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
}

export function deleteCharacter (req, res) {
  const charId = req.params.charId;

  actions
    .removeCharacter(charId)
    .then(data => {
      res.json({ data });
    })
    .catch(handleError.bind(res));
}
