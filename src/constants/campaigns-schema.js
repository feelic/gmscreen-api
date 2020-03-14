export default {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        theme: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        image: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        bios: {
          bsonType: "array",
          minItems: 0,
          uniqueItems: false,
          additionalProperties: false,
          items: {
            bsonType: ["object"],
            required: ["text", "hidden"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              hidden: {
                bsonType: "bool",
                description: "must be a boolean and is required"
              }
            }
          }
        }
      }
    }
  }
};
