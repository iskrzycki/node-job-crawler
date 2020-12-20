const expect = require("chai").expect;
const { noFluffMainParser } = require("../offerParsers/noFluffMainParser");
var fs = require("fs");

require.extensions[".txt"] = (module, filename) => {
  module.exports = fs.readFileSync(filename, "utf8");
};

const htmlData = require("./noFluffMainParser.data.txt");

describe("noFluffMainParser ", () => {
  it("should return properly parsed offer", () => {
    const desiredOffer = [
      {
        id: "senior-frontend-developer-7n-remote-a8it1c4c",
        url:
          "https://nofluffjobs.com/pl/job/senior-frontend-developer-7n-remote-a8it1c4c",
        position: "Senior Frontend Developer",
        salary: "12 600 - 15 120 PLN",
        location: "Zdalna",
        company: "7N Sp. z o.o.",
        source: "nofluffjobs",
      },
      {
        id: "senior-frontend-developer-astek-polska-warszawa-siqlxheg",
        url:
          "https://nofluffjobs.com/pl/job/senior-frontend-developer-astek-polska-warszawa-siqlxheg",
        position: "Senior Frontend Developer",
        salary: "19 000 - 23 000 PLN",
        location: "Zdalnie na czas Covid",
        company: "ASTEK Polska",
        source: "nofluffjobs",
      },
      {
        id: "front-end-shopify-developer-remote-xfive-xma1mzza",
        url:
          "https://nofluffjobs.com/pl/job/front-end-shopify-developer-remote-xfive-xma1mzza",
        position: "Front-end + Shopify Developer, Remote",
        salary: "4 200 - 5 880 USD",
        location: "Zdalna",
        company: "Xfive",
        source: "nofluffjobs",
      },
      {
        id: "senior-javascript-developer-shapespark-krakow-wsdb1tyg",
        url:
          "https://nofluffjobs.com/pl/job/senior-javascript-developer-shapespark-krakow-wsdb1tyg",
        position: "Senior JavaScript Developer",
        salary: "16 000 - 23 000 PLN",
        location: "Zdalnie na czas Covid",
        company: "Shapespark",
        source: "nofluffjobs",
      },
      {
        id: "javascript-developer-black-label-krakow-bzpezyw6",
        url:
          "https://nofluffjobs.com/pl/job/javascript-developer-black-label-krakow-bzpezyw6",
        position: "Javascript Developer",
        salary: "9 200 - 12 400 PLN",
        location: "Kraków, POL",
        company: "Black Label",
        source: "nofluffjobs",
      },
      {
        id: "frontend-developer-apptension-remote-wmp2begx",
        url:
          "https://nofluffjobs.com/pl/job/frontend-developer-apptension-remote-wmp2begx",
        position: "Frontend Developer",
        salary: "8 000 - 11 000 PLN",
        location: "Zdalna",
        company: "Apptension",
        source: "nofluffjobs",
      },
      {
        id: "remote-fullstack-angular-developer-igus-xj2r9qiv",
        url:
          "https://nofluffjobs.com/pl/job/remote-fullstack-angular-developer-igus-xj2r9qiv",
        position: "Remote Fullstack Angular Developer",
        salary: "12 000 - 17 000 PLN",
        location: "Zdalna",
        company: "igus Sp z o.o.",
        source: "nofluffjobs",
      },
      {
        id: "remote-javascript-angular-developer-super-devs-fhrawfi0",
        url:
          "https://nofluffjobs.com/pl/job/remote-javascript-angular-developer-super-devs-fhrawfi0",
        position: "Remote JavaScript/Angular Developer",
        salary: "16 000 - 24 000 PLN",
        location: "Zdalna",
        company: "super devs",
        source: "nofluffjobs",
      },
      {
        id: "senior-frontend-developer-unity-group-remote-0vxurcg3",
        url:
          "https://nofluffjobs.com/pl/job/senior-frontend-developer-unity-group-remote-0vxurcg3",
        position: "Senior Frontend Developer",
        salary: "12 000 - 18 000 PLN",
        location: "Zdalna",
        company: "Unity Group",
        source: "nofluffjobs",
      },
      {
        id: "javascript-architect-expert-software-mansion-krakow-ro1rogqa",
        url:
          "https://nofluffjobs.com/pl/job/javascript-architect-expert-software-mansion-krakow-ro1rogqa",
        position: "JavaScript Architect/Expert",
        salary: "18 000 - 24 000 PLN",
        location: "Kraków, POL",
        company: "Software Mansion",
        source: "nofluffjobs",
      },
      {
        id: "front-end-software-engineer-allegro-poznan-7jrhed5c",
        url:
          "https://nofluffjobs.com/pl/job/front-end-software-engineer-allegro-poznan-7jrhed5c",
        position: "Front-end Software Engineer",
        salary: "9 000 - 14 000 PLN",
        location: "Poznan, POL",
        company: "Allegro",
        source: "nofluffjobs",
      },
      {
        id: "senior-frontend-developer-spyrosoft-wroclaw-0zsqltls",
        url:
          "https://nofluffjobs.com/pl/job/senior-frontend-developer-spyrosoft-wroclaw-0zsqltls",
        position: "Senior Frontend Developer",
        salary: "13 000 - 17 500 PLN",
        location: "Zdalnie na czas Covid",
        company: "Spyrosoft",
        source: "nofluffjobs",
      },
      {
        id: "frontend-developer-astek-polska-katowice-4kzyjvhp",
        url:
          "https://nofluffjobs.com/pl/job/frontend-developer-astek-polska-katowice-4kzyjvhp",
        position: "Frontend Developer",
        salary: "12 600 - 15 750 PLN",
        location: "Zdalnie na czas Covid",
        company: "ASTEK Polska",
        source: "nofluffjobs",
      },
      {
        id: "senior-frontend-developer-vue-js-7n-remote-8erq8pu2",
        url:
          "https://nofluffjobs.com/pl/job/senior-frontend-developer-vue-js-7n-remote-8erq8pu2",
        position: "Senior/Frontend Developer (Vue.js)",
        salary: "12 600 - 16 800 PLN",
        location: "Zdalna",
        company: "7N Sp. z o.o.",
        source: "nofluffjobs",
      },
      {
        id: "magento-frontend-developer-polcode-remote-ia9kjnmw",
        url:
          "https://nofluffjobs.com/pl/job/magento-frontend-developer-polcode-remote-ia9kjnmw",
        position: "Magento Frontend Developer",
        salary: "5 500 - 10 000 PLN",
        location: "Zdalna",
        company: "Polcode",
        source: "nofluffjobs",
      },
      {
        id: "mid-frontend-javascript-developer-evojam-remote-7zddhml3",
        url:
          "https://nofluffjobs.com/pl/job/mid-frontend-javascript-developer-evojam-remote-7zddhml3",
        position: "Mid Frontend JavaScript Developer",
        salary: "7 500 - 13 000 PLN",
        location: "Zdalna",
        company: "Evojam",
        source: "nofluffjobs",
      },
      {
        id: "senior-frontend-javascript-developer-evojam-remote-ghkvfvkj",
        url:
          "https://nofluffjobs.com/pl/job/senior-frontend-javascript-developer-evojam-remote-ghkvfvkj",
        position: "Senior Frontend JavaScript Developer",
        salary: "13 000 - 19 000 PLN",
        location: "Zdalna",
        company: "Evojam",
        source: "nofluffjobs",
      },
      {
        id: "frontend-developer-alm-services-technology-group-wroclaw-k5hr021t",
        url:
          "https://nofluffjobs.com/pl/job/frontend-developer-alm-services-technology-group-wroclaw-k5hr021t",
        position: "Frontend Developer",
        salary: "12 000 - 17 000 PLN",
        location: "Wrocław, POL\n + 1",
        company: "ALM Services Technology Group",
        source: "nofluffjobs",
      },
      {
        id: "senior-react-developer-apreel-warszawa-vxytmeq1",
        url:
          "https://nofluffjobs.com/pl/job/senior-react-developer-apreel-warszawa-vxytmeq1",
        position: "Senior React Developer",
        salary: "18 900 - 23 100 PLN",
        location: "Warszawa, POL",
        company: "apreel Sp. z o.o.",
        source: "nofluffjobs",
      },
      {
        id: "frontend-developer-softwareplant-warszawa-hauf8zbo",
        url:
          "https://nofluffjobs.com/pl/job/frontend-developer-softwareplant-warszawa-hauf8zbo",
        position: "Frontend Developer",
        salary: "13 000 - 17 000 PLN",
        location: "Zdalnie na czas Covid",
        company: "SoftwarePlant",
        source: "nofluffjobs",
      },
    ];

    const offer = noFluffMainParser(htmlData);

    expect(offer).to.eql(desiredOffer);
  });
});
