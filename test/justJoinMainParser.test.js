const expect = require("chai").expect;
const { justJoinMainParser } = require("../offerParsers/justJoinMainParser");

describe("justJoinMainParser ", () => {
  it("should return properly parsed offer", () => {
    const rawJustJoinOffers = [
      {
        address_text: "Jono Basanavičiaus g. 15, Vilnius",
        city: "Vilnius",
        company_logo_url:
          "https://bucket.justjoin.it/offers/company_logos/thumb/6effd8b40ef3275fa462f652ef8a98ff9270604a.png?1603103900",
        company_name: "MailerLite",
        company_size: "100-200",
        company_url: "https://www.mailerlite.com/",
        country_code: "LT",
        employment_type: "permanent",
        experience_level: "mid",
        id: "mailerlite-mid-level-laravel-and-vue-js-developer-vilnius",
        latitude: "54.6811835",
        longitude: "25.2722748",
        marker_icon: "javascript",
        published_at: "2020-11-11T19:00:07.043Z",
        remote: true,
        remote_interview: false,
        salary_currency: "eur",
        salary_from: 3200,
        salary_to: 3800,
        skills: [
          { name: "MySQL", level: 3 },
          { name: "Vue.js", level: 4 },
          { name: "Laravel", level: 4 },
        ],
        street: "Jono Basanavičiaus g. 15",
        title: "Laravel and Vue.js Developer",
      },
      {
        address_text: "Park Naukowo Technologiczny, Opole",
        city: "Opole",
        company_logo_url:
          "https://bucket.justjoin.it/offers/company_logos/thumb/78ae5acc8f208febeff3b2ac8a4136abc92627fa.jpg?1591001960",
        company_name: "Z Management",
        company_size: "10-23",
        company_url: "https://zmanagement.pl/",
        country_code: "PL",
        employment_type: "permanent",
        experience_level: "mid",
        id: "z-management-java-developer",
        latitude: "50.6835683",
        longitude: "17.8740502",
        marker_icon: "java",
        published_at: "2020-11-11T17:50:00.000Z",
        remote: false,
        remote_interview: true,
        salary_currency: "pln",
        salary_from: 8000,
        salary_to: 10000,
        skills: [
          { name: "Git", level: 2 },
          { name: "HTML5", level: 3 },
          { name: "Java", level: 3 },
        ],
        street: "Park Naukowo Technologiczny",
        title: "Java Game Developer",
      },
    ];

    const desiredOutput = [
      {
        url:
          "https://justjoin.it/offers/mailerlite-mid-level-laravel-and-vue-js-developer-vilnius",
        position: "Laravel and Vue.js Developer",
        salary: "3200 - 3800 EUR",
        location: "Remote",
        company: "MailerLite",
        source: "justjoinit",
        id: "mailerlite-mid-level-laravel-and-vue-js-developer-vilnius",
        publishedAt: "2020-11-11T19:00:07.043Z",
      },
      {
        url: "https://justjoin.it/offers/z-management-java-developer",
        position: "Java Game Developer",
        id: "z-management-java-developer",
        salary: "8000 - 10000 PLN",
        publishedAt: "2020-11-11T17:50:00.000Z",
        location: "Opole, PL",
        company: "Z Management",
        source: "justjoinit",
      },
    ];

    const offer = justJoinMainParser(rawJustJoinOffers);

    expect(offer).to.eql(desiredOutput);
  });
});
