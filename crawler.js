const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const { justJoinMainParser } = require("./offerParsers/justJoinMainParser");
const { noFluffMainParser } = require("./offerParsers/noFluffMainParser");
const { sendEmail } = require("./emailService");
const logger = require("./logger").logger;

const { DB_USER, DB_PASS, DB_PORT, DB_SERVER, DB_NAME } = process.env;

const offers = require("./model");
const { bulldogMainParser } = require("./offerParsers/bulldogMainParser");

const fetchPage = async (url) => await axios(url).then((res) => res.data);

const uri = `mongodb://${DB_USER}:${encodeURIComponent(
  DB_PASS
)}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", async () => {
  const allOffers = await offers.find({});
  const urls = allOffers.map((offer) => offer.url);

  logger.info(`${allOffers.length} offers currently in database`);

  let noFluffOffers = [];
  let justJoinOffers = [];
  let bulldogOffers = [];

  try {
    const noFluffUrl = "https://nofluffjobs.com/pl/jobs/frontend";
    const noFluffHtml = await fetchPage(noFluffUrl);
    noFluffOffers = noFluffMainParser(noFluffHtml).filter(
      (offer) => !urls.includes(offer.url)
    );

    logger.info(`${noFluffOffers.length} new offers on nofluffjobs`);
  } catch (e) {
    logger.warn(`error during nofluff scraping`);
  }

  // TODO justjoint temporary commented out. API disabled, so needs to be handled by parsing HTML

  // const justJoinUrl = "https://justjoin.it/api/offers";
  // const justJoinHtml = await fetchPage(justJoinUrl);
  // justJoinOffers = justJoinMainParser(justJoinHtml).filter(
  //   (offer) => !urls.includes(offer.url)
  // );

  // logger.info(`${justJoinOffers.length} new offers on justjoin`);

  try {
    const bulldogUrl = "https://bulldogjob.pl/companies/jobs/s/role,frontend";
    const bulldogHtml = await fetchPage(bulldogUrl);
    bulldogOffers = bulldogMainParser(bulldogHtml).filter(
      (offer) => !urls.includes(offer.url)
    );

    logger.info(`${bulldogOffers.length} new offers on bulldogjob`);
  } catch (e) {
    logger.warn(`error during bulldog scraping`);
  }

  const mergedOffers = [...noFluffOffers, ...justJoinOffers, ...bulldogOffers];

  if (mergedOffers.length > 0) {
    await offers.insertMany(mergedOffers);
    logger.info(`${mergedOffers.length} new offers added`);
  } else {
    logger.info("No new offers!");
  }
  mongoose.disconnect();
});
