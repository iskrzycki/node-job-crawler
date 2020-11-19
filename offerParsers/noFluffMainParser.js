const cheerio = require("cheerio");

const extractText = (elem, path) => elem.find(path).text().trim();

const noFluffMainParser = (html) => {
  const $ = cheerio.load(html);

  const jobList = $("nfj-postings-list a.posting-list-item");
  const jobs = [];

  jobList.each((i, salaryElem) => {
    const url = "https://nofluffjobs.com" + $(salaryElem).attr("href");

    const parts = $(salaryElem).attr("href").split("/");
    const id = parts.pop();


    const position = extractText(
      $(salaryElem),
      "nfj-posting-item-title h3.posting-title__position"
    );

    const company = extractText(
      $(salaryElem),
      "nfj-posting-item-title span.posting-title__company"
    ).replace("w ", "");

    const location = extractText(
      $(salaryElem),
      "div.posting-info > span.posting-info__location"
    );

    const salary = extractText(
      $(salaryElem),
      "div.posting-info > nfj-posting-item-tags > span.salary"
    ).replace(/ +(?= )/g, ""); // removing multiple spaces

    jobs.push({
      id,
      url,
      position,
      salary,
      location,
      company,
      source: "nofluffjobs",
    });
  });

  return jobs;
};

exports.noFluffMainParser = noFluffMainParser;
