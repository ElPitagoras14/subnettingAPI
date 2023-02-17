const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const flsmRouter = require("./routes/flsm");
const vlsmRouter = require("./routes/vlsm");
const subnetTreeRouter = require("./routes/subnetTree");

const app = express();
const cors = require('cors');


app.use(cors({
  origin: "*",
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1/flsm", flsmRouter);
app.use("/v1/vlsm", vlsmRouter);
app.use("/v1/tree", subnetTreeRouter);

app.use("**", (req, res, next) => {
  res.send({ message: "It's working" });
});

module.exports = app;
