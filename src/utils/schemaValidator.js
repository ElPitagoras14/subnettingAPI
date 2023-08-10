const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const ipPattern =
  "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){1,3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

const flsmSchema = {
  type: "object",
  properties: {
    ip: {
      type: "string",
      pattern: ipPattern,
    },
    mask: {
      type: "number",
      minimum: 0,
      maximum: 32,
    },
    min: {
      type: "number",
      minimum: 2,
    },
  },
  required: ["ip", "mask", "min"],
};

const vlsmSchema = {
  type: "object",
  properties: {
    ip: {
      type: "string",
      pattern: ipPattern,
    },
    mask: {
      type: "number",
      minimum: 0,
      maximum: 32,
    },
    hostList: {
      type: "array",
      minItems: 1,
      items: {
        type: "number",
        minimum: 2,
      },
    },
  },
  required: ["ip", "mask", "hostList"],
};

const subnettingSchema = {
  type: "object",
  properties: {
    subnettingInfo: {
      type: "object",
      properties: {
        initialIp: {
          type: "string",
          pattern: ipPattern,
        },
        initialMask: {
          type: "number",
          minimum: 0,
          maximum: 32,
        },
      },
      required: ["initialIp", "initialMask"],
    },
    networks: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          subnet: {
            type: "string",
            pattern: ipPattern,
          },
          mask: {
            type: "number",
            minimum: 0,
            maximum: 32,
          },
          firstIp: {
            type: "string",
            pattern: ipPattern,
          },
          lastIp: {
            type: "string",
            pattern: ipPattern,
          },
          broadcast: {
            type: "string",
            pattern: ipPattern,
          },
        },
        required: ["name", "subnet", "mask", "firstIp", "lastIp", "broadcast"],
      },
    },
  },
  required: ["subnettingInfo", "networks"],
  additionalProperties: true,
};

ajv.addSchema(flsmSchema, "flsmSchema");
ajv.addSchema(vlsmSchema, "vlsmSchema");
ajv.addSchema(subnettingSchema, "subnettingSchema");

const validateSchema = (schema, schemaName) => {
  const validate = ajv.getSchema(schemaName);
  const valid = validate(schema);
  if (!valid) {
    const errors = [];
    for (const error of validate.errors) {
      errors.push(error.dataPath.slice(1) + " " + error.message);
    }
    return errors;
  }
  return null;
};

module.exports = {
  validateSchema,
};
