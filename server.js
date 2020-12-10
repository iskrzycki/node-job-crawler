const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const router = express.Router();
const offers = require("./model");

const { DB_USER, DB_PASS, DB_PORT, DB_SERVER } = process.env;

const uri = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASS
)}@${DB_SERVER}:${DB_PORT}`;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

router.get("/offers", async (req, res) => {
  console.log("get offers");
  try {
    const dbOffers = await offers.find({});
    return res.send(dbOffers);
  } catch (ex) {
    return res.status(400).send({
      message: "An error occured",
    });
  }
});

app.use(express.static(__dirname + "/front/build"));
app.use("/api", router);

app.listen(80, () => console.log(`App listening on port 80`));
