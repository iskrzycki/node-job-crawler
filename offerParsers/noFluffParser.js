const cheerio = require("cheerio");
const { salaryParser } = require("./salaryParser");

const parseNoFluffOffer = (html) => {
  const $ = cheerio.load(html);

  const role = $("div.posting-details-description > h1").text().trim();
  const company = $("div.posting-details-description a")
    .first()
    .find("dd")
    .text()
    .trim();

  const salaryList = $(".salary");
  const salaries = [];

  salaryList.each((i, salaryElem) => {
    const salaryString = $(salaryElem).find("h4").text().trim();
    const salaryDesc = $(salaryElem).find("p").text().trim();

    salaries.push(salaryParser(salaryString, salaryDesc));
  });

  let mandatory = [];
  let niceToHave = [];

  const getArrayOfStringsFromParent = (parent) =>
    $(parent)
      .find("nfj-posting-item-tag")
      .toArray()
      .map((x) => $(x).text().trim());

  $("nfj-posting-requirements").each((i, requirementElem) => {
    switch (i) {
      case 0:
        mandatory = getArrayOfStringsFromParent($(requirementElem));
      case 1:
        niceToHave = getArrayOfStringsFromParent($(requirementElem));
    }
  });

  const seniority = $(
    "nfj-posting-seniority > div.seniority-section > div > .active"
  )
    .toArray()
    .map((x) => $(x).text().trim());

  return {
    role,
    company,
    salaries,
    seniority,
    requirements: {
      mandatory,
      niceToHave,
    },
  };
};

exports.parseNoFluffOffer = parseNoFluffOffer;
