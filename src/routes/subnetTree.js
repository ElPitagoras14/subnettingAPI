const express = require("express");
const router = express.Router();
const {
  createStrSubnetTree,
} = require("../controllers/subnetting");
const fs = require('fs');

const Response = require("../utils/responses");
const responses = new Response();

router.post("/create", (req, res, next) => {
  const { body } = req || {};

  try {
    const strTree = createStrSubnetTree(body);
    return responses.success(res, {
      stringTree: strTree,
    });
  } catch (err) {
    console.error(err);
    return responses.unknowError(res);
  }
});

router.post("/save", (req, res, next) => {
  const { body } = req || {};

  try {
    const strTree = createStrSubnetTree(body);
    console.log(strTree)
    const file = "tree.txt";
    return fs.writeFile(file, strTree, (err) => {
      if (err) {
        console.error(err);
        return responses.unknowError(res, "Error creating the file");
      }
      return res.download(file, (err) => {
        if (err) {
          console.error(err);
          return responses.unknowError(res, "Error downloading the file");
        }
        return fs.unlink(file, function (err) {
          if (err) {
            console.error(err);
            return responses.unknowError(res, err);
          }
        });
      });
    });
  } catch (err) {
    console.error(err);
    return responses.unknowError(res);
  }
});

module.exports = router;
