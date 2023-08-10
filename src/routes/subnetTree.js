const express = require("express");
const router = express.Router();
const {
  createStrSubnetTree,
} = require("../controllers/subnetting");
const fs = require('fs');

const Response = require("../utils/responses");
const responses = new Response();

const { validateSchema } = require("../utils/schemaValidator");


router.post("/create", (req, res, next) => {
  const { body } = req || {};

  const validation = validateSchema(body, "subnettingSchema");

  if (validation) {
    return responses.badRequest(res, validation);
  }

  try {
    const strTree = createStrSubnetTree(body);
    return responses.success(res, {
      stringTree: strTree,
    });
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

router.post("/save", (req, res, next) => {
  const { body } = req || {};

  const validation = validateSchema(body, "subnettingSchema");

  if (validation) {
    return responses.badRequest(res, validation);
  }

  try {
    const strTree = createStrSubnetTree(body);
    const file = "tree.txt";
    return fs.writeFile(file, strTree, (err) => {
      if (err) {
        console.error(err);
        return responses.unknownError(res, "Error creating the file");
      }
      return res.download(file, (err) => {
        if (err) {
          console.error(err);
          return responses.unknownError(res, "Error downloading the file");
        }
        return fs.unlink(file, function (err) {
          if (err) {
            console.error(err);
            return responses.unknownError(res, err);
          }
        });
      });
    });
  } catch (err) {
    console.error(err);
    return responses.unknownError(res);
  }
});

module.exports = router;
