const express = require("express");
const router = express.Router();
const { flsmHost, flsmNetwork } = require("../utils/subnetting");
const Response = require("../utils/responses");
const responses = new Response();

router.post("/host", (req, res, next) => {
  const {
    body: { ip, mask, min },
  } = req || {};
  try {
    const response = flsmHost(ip, mask, min);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

router.post("/network", (req, res, next) => {
  const {
    body: { ip, mask, min },
  } = req || {};
  try {
    const response = flsmNetwork(ip, mask, min);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

module.exports = router;
