export default {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      properties: {
        campaign: {
          bsonType: "string",
          description:"must be a ref to the campaign this character is part of and is required"
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        faction: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        description: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        status: {
          enum: ["alive", "dead", "missing"],
          description: "can only be one of the enum values and is required"
        },
        hidden: {
          bsonType: "bool",
          description: "must be a boolean and is required"
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
