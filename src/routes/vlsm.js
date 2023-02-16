const express = require("express");
const router = express.Router();
const { vlsmHost, vlsmSorteredHost } = require("../utils/subnetting");
const Response = require("../utils/responses");
const responses = new Response();

router.post("/unsorted", (req, res, next) => {
  const {
    body: { ip, mask, hostList },
  } = req || {};
  try {
    const response = vlsmHost(ip, mask, hostList);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknowError(res);
  }
});

router.post("/sorted", (req, res, next) => {
  const {
    body: { ip, mask, hostList },
  } = req || {};
  try {
    const response = vlsmSorteredHost(ip, mask, hostList);
    return responses.success(res, response);
  } catch (err) {
    console.error(err);
    return responses.unknowError(res);
  }
});

module.exports = router;
