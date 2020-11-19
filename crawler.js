const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();
const { justJoinMainParser } = require("./offerParsers/justJoinMainParser");
const { noFluffMainParser } = require("./offerParsers/noFluffMainParser");
const { sendEmail } = require("./emailService");

const { DB_USER, DB_PASS, DB_PORT, DB_SERVER } = process.env;

const offers = require("./model");

const fetchPage = async (url) => await axios(url).then((res) => res.data);

const uri = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASS
)}@${DB_SERVER}:${DB_PORT}`;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", async () => {
  console.log("MongoDB database connection established successfully");

  const allOffers = await offers.find({});

  console.log(`${allOffers.length} offers fetched`);

  // offers.find({}, (err, result) => {
  //   if (err) {
  //     console.log("An error occured during fetching offers");
  //   } else {
  //     console.log("offers ", result);
  //   }
  // });

  // const noFluffUrl = "https://nofluffjobs.com/pl/jobs/frontend";
  // const html = await fetchPage(noFluffUrl);
  // const off = noFluffMainParser(html);

  // offers.insertMany(off, (err, result) => {
  //   if (err) {
  //     console.log("ERROR");
  //   } else {
  //     console.log(`OK! ${off.length} offers added`);
  //   }
  // });
});

// const noFluffUrl = "https://nofluffjobs.com/pl/jobs/frontend";
// const html = await fetchPage(noFluffUrl);
// const offers = noFluffMainParser(html);

//   const url = "https://justjoin.it/api/offers";
//   const justJoinOffers = await fetchPage(url);
//   const mappedOffers = justJoinMainParser(justJoinOffers);
