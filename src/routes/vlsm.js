const express = require("express");
const router = express.Router();
const { vlsmHost, vlsmSorteredHost } = require("../utils/subnetting");
const Response = require("../utils/responses");
const responses = new Response();
const { validateSchema } = require("../utils/schemaValidator");

router.post("/unsorted", (req, res, next) => {
  const { body } = req || {};

  const validation = validateSchema(body, "vlsmSchema");

  if (validation) {
    return responses.badRequest(res, validation);
  }

  const { ip, mask, hostList } = body || {};

  try {
    const response = vlsmHost(ip, mask, hostList);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

router.post("/sorted", (req, res, next) => {
  const { body } = req || {};

  const validation = validateSchema(body, "vlsmSchema");

  if (validation) {
    return responses.badRequest(res, validation);
  }

  const { ip, mask, hostList } = body || {};
  try {
    const response = vlsmSorteredHost(ip, mask, hostList);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

module.exports = router;
