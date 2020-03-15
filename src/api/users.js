import fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json'));
const records = config.users;

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
