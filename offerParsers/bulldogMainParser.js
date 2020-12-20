const cheerio = require("cheerio");

// TODO consider moving extractText to kind of helpers file
const extractText = (elem, path) => elem.find(path).text().trim();

const bulldogMainParser = (html) => {
  const $ = cheerio.load(html);

  const jobList = $("ul.results-list > a");
  const jobs = [];

  jobList.each((i, salaryElem) => {
    const url = $(salaryElem).attr("href");

    const parts = url.split("/");
    const id = parts.pop();

    const position = extractText($(salaryElem), ".details > .title > h3");

    const company = extractText($(salaryElem), ".details > .meta > .company");

    const location = extractText($(salaryElem), ".details > .meta > .location");

    const salary = extractText($(salaryElem), ".technologies > .salary");

    jobs.push({
      id,
      url,
      position,
      salary,
      location,
      company,
      source: "bulldogjob",
    });
  });

  return jobs;
};

exports.bulldogMainParser = bulldogMainParser;
