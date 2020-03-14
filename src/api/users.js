const records = [
  {
    id: 1,
    username: "jack",
    password: "secret",
    displayName: "Jack",
    emails: [{ value: "jack@example.com" }]
  },
  {
    id: 2,
    username: "jill",
    password: "birthday",
    displayName: "Jill",
    emails: [{ value: "jill@example.com" }]
  }
];

export function findById (id) {
  return new Promise((resolve, reject) => {
    var idx = id - 1;
    if (records[idx]) {
      return resolve(records[idx]);
    }

    return reject(new Error("User " + id + " does not exist"));
  })
}

export function findByUsername (username) {
  return new Promise((resolve, reject) => {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return resolve(record);
      }
    }
    return reject();
  })
}
