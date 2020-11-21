const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
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
  const allOffers = await offers.find({});
  const urls = allOffers.map((offer) => offer.url);

  console.log(`${allOffers.length} offers currently in database`);

  const noFluffUrl = "https://nofluffjobs.com/pl/jobs/frontend";
  const noFluffHtml = await fetchPage(noFluffUrl);
  const noFluffOffers = noFluffMainParser(noFluffHtml).filter(
    (offer) => !urls.includes(offer.url)
  );

  console.log(`${noFluffOffers.length} new offers on nofluffjobs`);

  const justJoinUrl = "https://justjoin.it/api/offers";
  const justJoinHtml = await fetchPage(justJoinUrl);
  const justJoinOffers = justJoinMainParser(justJoinHtml).filter(
    (offer) => !urls.includes(offer.url)
  );

  console.log(`${justJoinOffers.length} new offers on justjoin`);

  const mergedOffers = [...noFluffOffers, ...justJoinOffers];

  if (mergedOffers.length > 0) {
    await offers.insertMany(mergedOffers);
    console.log(`${mergedOffers.length} new offers added`);
  } else {
    console.log("No new offers!");
  }
  mongoose.disconnect();
});
