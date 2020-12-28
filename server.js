const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const router = express.Router();
const offers = require("./model");

const { DB_USER, DB_PASS, DB_PORT, DB_SERVER, API_PORT } = process.env;

const uri = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASS
)}@${DB_SERVER}:${DB_PORT}`;

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

app.use(express.static(__dirname + "/front/build"));
app.use("/api", router);

app.listen(API_PORT, () => console.log(`App listening on port ${API_PORT}`));
