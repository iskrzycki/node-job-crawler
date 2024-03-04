const express = require("express");
const app = express();
const mongoose = require("mongoose");
const crawler = require("./crawler");
require("dotenv").config({ path: __dirname + "/.env" });
const router = express.Router();
const offers = require("./model");

const { DB_USER, DB_PASS, DB_PORT, DB_SERVER, DB_NAME } = process.env;

const uri = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASS
)}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

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

app.use("/api", router);

app.listen(3000, () => console.log(`App listening on port 3000`));
