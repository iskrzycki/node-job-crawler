const expect = require("chai").expect;
const { parseNoFluffOffer } = require("../offerParsers/noFluffParser");
var fs = require("fs");

require.extensions[".txt"] = (module, filename) => {
  module.exports = fs.readFileSync(filename, "utf8");
};

const htmlData = require("./parseNoFluffOffer.data.txt");

describe("parseNoFluffOffer", () => {
  it("should return properly parsed offer", () => {
    const desiredOffer = {
      role: "Mid/Senior Java Developer",
      company: "Sii Polska",
      salaries: [
        { min: 750, max: 1100, currency: "PLN", desc: "+ vat (B2B) dziennie" },
        {
          min: 10000,
          max: 15000,
          currency: "PLN",
          desc: "brutto (umowa o pracę) miesięcznie",
        },
      ],
      requirements: {
        mandatory: ["Java", "Spring", "Git", "REST", "English"],
        niceToHave: [
          "Kafka",
          "MongoDB",
          "Hadoop",
          "Cassandra",
          "Scala",
          "spark",
          "Team player",
          "Critical thinking",
          "Problem solving",
          "Proactivity",
        ],
      },
      seniority: ["Mid", "Senior"],
    };

    const offer = parseNoFluffOffer(htmlData);

    expect(offer).to.eql(desiredOffer);
  });
});
