const cheerio = require("cheerio");

// TODO consider moving extractText to kind of helpers file
const extractText = (elem, path) => elem.find(path).text().trim();

const bulldogMainParser = (html) => {
  const $ = cheerio.load(html);

  const jobList = $("div.container > a.shadow-jobitem");
  const jobs = [];

  jobList.each((i, salaryElem) => {
    const url = $(salaryElem).attr("href");

    const parts = url.split("/");
    const id = parts.pop();

    const position = extractText($(salaryElem), "div.grow > h3");

    const company = extractText(
      $(salaryElem),
      "div.grow > div.flex.items-center > div.text-xxs"
    );

    const location = extractText(
      $(salaryElem),
      "div.grow > div.hidden > div.flex.items-start > div.relative.rounded-t-lg > span.text-xs"
    );

    const salary = extractText(
      $(salaryElem),
      "div.flex.flex-col > div.flex.flex-col > div.text-dm > div"
    );

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
