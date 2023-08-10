const express = require("express");
const router = express.Router();
const { flsmHost, flsmNetwork } = require("../utils/subnetting");
const Response = require("../utils/responses");
const responses = new Response();
const { validateSchema } = require("../utils/schemaValidator");

router.post("/host", (req, res, next) => {
  const { body } = req || {};

  const validation = validateSchema(body, "flsmSchema");

  if (validation) {
    return responses.badRequest(res, validation);
  }

  const { ip, mask, min } = body || {};

  try {
    const response = flsmHost(ip, mask, min);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

router.post("/network", (req, res, next) => {
  const { body } = req || {};

  const validation = validateSchema(body, "flsmSchema");

  if (validation) {
    return responses.badRequest(res, validation);
  }

  const { ip, mask, min } = body || {};

  try {
    const response = flsmNetwork(ip, mask, min);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

module.exports = router;
