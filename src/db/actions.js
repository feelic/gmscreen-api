import { runDBAction } from "./connect.js";
import { DB_NAME } from "../constants/index.js";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

export function insertCharacters(characters) {
  return runDBAction(collection => {
    return collection.insertMany(characters);
  });
}
export function findCharacters(criteria) {
  return runDBAction(collection => {
    return collection.find(criteria).toArray();
  });
}
export function findCharacter(id) {
  return runDBAction(collection => {
    return collection.find({ _id: new ObjectId(id) }).toArray();
  })
}
export function updateCharacter(id, values) {
  return runDBAction(collection => {
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: values });
  });
}
export function removeCharacter(id) {
  return runDBAction(collection => {
    return collection.deleteOne({ _id: new ObjectId(id) });
  });
}
