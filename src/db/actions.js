import { runDBAction } from "./connect.js";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

export function insertCharacters(characters) {
  return runDBAction(db => {
    const collection = db.collection("characters");

    return collection.insertMany(characters);
  });
}
export function findCharacters(criteria) {
  return runDBAction(db => {
    const collection = db.collection("characters");

    return collection.find(criteria).toArray();
  });
}
export function findCharacter(id) {
  return runDBAction(db => {
    const collection = db.collection("characters");

    return collection.find({ _id: new ObjectId(id) }).toArray();
  });
}
export function updateCharacter(id, values) {
  return runDBAction(db => {
    const collection = db.collection("characters");

    return collection.updateOne({ _id: new ObjectId(id) }, { $set: values });
  });
}
export function removeCharacter(id) {
  return runDBAction(db => {
    const collection = db.collection("characters");

    return collection.deleteOne({ _id: new ObjectId(id) });
  });
}
