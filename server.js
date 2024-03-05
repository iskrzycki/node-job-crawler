const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const crawler = require("./crawler");
require("dotenv").config({ path: __dirname + "/.env" });
const router = express.Router();
const offers = require("./model");

const { DB_USER, DB_PASS, DB_PORT, DB_SERVER, DB_NAME } = process.env;

const uri = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASS
)}@${DB_SERVER}:${DB_PORT}/${DB_NAME}?authSource=admin`;

console.log("Connecting to ", uri);

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

router.get("/offers", async (req, res) => {
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 30;

  try {
    const dbOffers = await offers
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    return res.send(dbOffers);
  } catch (ex) {
    return res.status(400).send({
      message: "An error occured",
    });
  }
});

router.get("/crawl", async (req, res) => {
  try {
    const result = await crawler.crawl();
    return res.send({ result });
  } catch (ex) {
    return res.status(400).send({
      message: "An error occured",
    });
  }
});

app.use(cors()); // TODO consider setting proper origin here

app.use("/api", router);

app.listen(3000, () => console.log(`App listening on port 3000`));
