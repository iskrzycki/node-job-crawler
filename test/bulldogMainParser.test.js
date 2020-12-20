const expect = require("chai").expect;
const { bulldogMainParser } = require("../offerParsers/bulldogMainParser");
var fs = require("fs");

require.extensions[".txt"] = (module, filename) => {
  module.exports = fs.readFileSync(filename, "utf8");
};

const htmlData = require("./bulldogMainParser.data.txt");

describe("bulldogMainParser ", () => {
  it("should return properly parsed offer", () => {
    const desiredOffer = [
      {
        company: "GFT Poland",
        id: "19875-senior-javascript-developer-gft-poland",
        location: "Remotely",
        position: "Senior JavaScript Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19875-senior-javascript-developer-gft-poland",
      },
      {
        company: "Motorola Solutions Systems Polska Sp.z.o.o",
        id:
          "19859-senior-frontend-developer-angular-krakow-motorola-solutions-systems-polska-sp-z-o-o",
        location: "Kraków",
        position: "Senior Frontend Developer (Angular)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19859-senior-frontend-developer-angular-krakow-motorola-solutions-systems-polska-sp-z-o-o",
      },
      {
        company: "Luxoft",
        id: "20504-senior-front-end-developer-for-azure-cloud-wroclaw-luxoft",
        location: "Wrocław",
        position: "Senior Front-End Developer for Azure Cloud",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20504-senior-front-end-developer-for-azure-cloud-wroclaw-luxoft",
      },
      {
        company: "Transition Technologies PSC",
        id:
          "20061-frontend-developer-lodz-wroclaw-bialystok-zielona-gora-poznan-kielce-transition-technologies-psc",
        location: "Łódź, Wrocław, Białystok, Zielona Góra, Poznań, Kielce",
        position: "Frontend Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20061-frontend-developer-lodz-wroclaw-bialystok-zielona-gora-poznan-kielce-transition-technologies-psc",
      },
      {
        company: "Digital Colliers",
        id: "19730-senior-frontend-developer-krakow-digital-colliers",
        location: "Kraków, Zdalnie",
        position: "Senior Frontend Developer",
        salary: "9 000 - 20 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19730-senior-frontend-developer-krakow-digital-colliers",
      },
      {
        company: "Shiji Poland",
        id: "20488-mid-senior-front-end-developer-shiji-poland",
        location: "Remotely",
        position: "Mid/Senior Front-end Developer",
        salary: "9 000 - 18 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20488-mid-senior-front-end-developer-shiji-poland",
      },
      {
        company: "SYZYGY Warsaw",
        id: "20482-front-end-developer-warszawa-syzygy-warsaw",
        location: "Warszawa",
        position: "Front-end Developer",
        salary: "11 400 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20482-front-end-developer-warszawa-syzygy-warsaw",
      },
      {
        company: "Power Media",
        id: "20772-frontend-developer-angular-krakow-power-media",
        location: "Kraków",
        position: "Frontend Developer (Angular)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20772-frontend-developer-angular-krakow-power-media",
      },
      {
        company: "Stokrotka Sp. z o.o.",
        id: "19359-java-frontend-developer-lublin-stokrotka-sp-z-o-o",
        location: "Lublin",
        position: "Java Frontend Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19359-java-frontend-developer-lublin-stokrotka-sp-z-o-o",
      },
      {
        company: "Sii Polska",
        id: "21408-front-end-developer-katowice-sii-polska",
        location: "Katowice",
        position: "Front-end Developer",
        salary: "13 000 - 15 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21408-front-end-developer-katowice-sii-polska",
      },
      {
        company: "7N",
        id: "20416-frontend-developer-angular-2-vue-7n",
        location: "Zdalnie",
        position: "Frontend Developer (Angular 2+/Vue)",
        salary: "16 800 - 18 400 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20416-frontend-developer-angular-2-vue-7n",
      },
      {
        company: "Sofomo",
        id: "19228-frontend-developer-sofomo",
        location: "Remotely",
        position: "Frontend Developer",
        salary: "9 000 - 14 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19228-frontend-developer-sofomo",
      },
      {
        company: "Luxoft",
        id: "20383-senior-software-developer-wroclaw-luxoft",
        location: "Wrocław",
        position: "Senior Software Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20383-senior-software-developer-wroclaw-luxoft",
      },
      {
        company: "Luxoft",
        id: "20379-front-end-developer-warszawa-luxoft",
        location: "Warszawa",
        position: "Front-End Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20379-front-end-developer-warszawa-luxoft",
      },
      {
        company: "Aptiv",
        id:
          "19857-react-front-end-software-developer-visualization-and-analytics-krakow-aptiv",
        location: "Kraków",
        position:
          "React Front-End Software Developer – Visualization and Analytics",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19857-react-front-end-software-developer-visualization-and-analytics-krakow-aptiv",
      },
      {
        company: "Trineo Sp. z o.o.",
        id: "19950-front-end-developer-gdynia-trineo-sp-z-o-o",
        location: "Gdynia",
        position: "Front-end Developer",
        salary: "10 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19950-front-end-developer-gdynia-trineo-sp-z-o-o",
      },
      {
        company: "SPOC - ServiceNow Experts",
        id:
          "20927-junior-javascript-developer-servicenow-poznan-spoc-servicenow-experts",
        location: "Poznań",
        position: "Junior JavaScript Developer (ServiceNow)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20927-junior-javascript-developer-servicenow-poznan-spoc-servicenow-experts",
      },
      {
        company: "iPresso",
        id: "20322-frontend-angular-developer-katowice-ipresso",
        location: "Katowice",
        position: "Frontend Angular Developer",
        salary: "6 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20322-frontend-angular-developer-katowice-ipresso",
      },
      {
        company: "VEVENTY",
        id: "20306-frontend-developer-veventy",
        location: "Zdalnie",
        position: "Frontend Developer",
        salary: "6 000 - 10 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20306-frontend-developer-veventy",
      },
      {
        company: "Commerzbank - Centrum Technologii Cyfrowych w Polsce",
        id:
          "21256-front-end-fullstack-developer-for-architecture-team-lodz-commerzbank-centrum-technologii-cyfrowych-w-polsce",
        location: "Łódź",
        position: "Front-end/ Fullstack Developer for Architecture team",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21256-front-end-fullstack-developer-for-architecture-team-lodz-commerzbank-centrum-technologii-cyfrowych-w-polsce",
      },
      {
        company: "Yggdrasil Gaming",
        id: "19645-javascript-game-developer-krakow-yggdrasil-gaming",
        location: "Kraków",
        position: "JavaScript Game Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19645-javascript-game-developer-krakow-yggdrasil-gaming",
      },
      {
        company: "Acclaim",
        id: "19812-remote-wordpress-developer-acclaim",
        location: "Remotely",
        position: "Remote WordPress Developer",
        salary: "7 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19812-remote-wordpress-developer-acclaim",
      },
      {
        company: "Power Media",
        id: "20240-react-developer-wroclaw-power-media",
        location: "Wrocław",
        position: "React Developer",
        salary: "12 000 - 18 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20240-react-developer-wroclaw-power-media",
      },
      {
        company: "VEVENTY",
        id: "20223-junior-frontend-developer-html-css-veventy",
        location: "Zdalnie",
        position: "Junior Frontend Developer | HTML, CSS",
        salary: "3 000 - 4 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20223-junior-frontend-developer-html-css-veventy",
      },
      {
        company: "Power Media",
        id: "19861-frontend-developer-angular-gliwice-krakow-power-media",
        location: "Gliwice, Kraków",
        position: "Frontend Developer (Angular)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19861-frontend-developer-angular-gliwice-krakow-power-media",
      },
      {
        company: "Xperi Corporation",
        id:
          "21162-javascript-senior-frontend-developer-warszawa-xperi-corporation",
        location: "Warszawa, Remotely",
        position: "JavaScript Senior Frontend Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21162-javascript-senior-frontend-developer-warszawa-xperi-corporation",
      },
      {
        company: "Nokia",
        id: "21159-front-end-developer-working-student-wroclaw-nokia",
        location: "Wrocław",
        position: "Front-end Developer (Working student)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21159-front-end-developer-working-student-wroclaw-nokia",
      },
      {
        company: "Mirum Poland Sp. z o.o.",
        id: "20820-frontend-developer-chorzow-mirum-poland-sp-z-o-o",
        location: "Chorzów",
        position: "Frontend Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20820-frontend-developer-chorzow-mirum-poland-sp-z-o-o",
      },
      {
        company: "Accenture Advanced Technology Center Poland",
        id: "19335-regular-senior-front-end-developer-lodz-accenture-sp-z-o-o",
        location: "Łódź",
        position: "Regular/Senior Front-end Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19335-regular-senior-front-end-developer-lodz-accenture-sp-z-o-o",
      },
      {
        company: "Accenture Advanced Technology Center Poland",
        id: "19337-javascript-developer-node-js-lodz-accenture-sp-z-o-o",
        location: "Łódź",
        position: "JavaScript Developer (Node.JS)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19337-javascript-developer-node-js-lodz-accenture-sp-z-o-o",
      },
      {
        company: "JCommerce",
        id:
          "21078-regular-senior-front-end-developer-react-e-commerce-katowice-poznan-krakow-jcommerce",
        location: "Katowice, Poznań, Kraków, Zdalnie",
        position: "Regular / Senior Front-End Developer | React, e-commerce",
        salary: "Do 20 800 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21078-regular-senior-front-end-developer-react-e-commerce-katowice-poznan-krakow-jcommerce",
      },
      {
        company: "Polcode Sp. z o.o.",
        id: "20627-react-developer-polcode-sp-z-o-o",
        location: "Zdalnie",
        position: "React Developer",
        salary: "6 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20627-react-developer-polcode-sp-z-o-o",
      },
      {
        company: "Polcode Sp. z o.o.",
        id: "20628-react-developer-warszawa-polcode-sp-z-o-o",
        location: "Warszawa",
        position: "React Developer",
        salary: "6 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20628-react-developer-warszawa-polcode-sp-z-o-o",
      },
      {
        company: "Polcode Sp. z o.o.",
        id: "20629-react-developer-lodz-polcode-sp-z-o-o",
        location: "Łódź",
        position: "React Developer",
        salary: "6 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20629-react-developer-lodz-polcode-sp-z-o-o",
      },
      {
        company: "Polcode Sp. z o.o.",
        id: "20630-react-developer-krakow-polcode-sp-z-o-o",
        location: "Kraków",
        position: "React Developer",
        salary: "6 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20630-react-developer-krakow-polcode-sp-z-o-o",
      },
      {
        company: "Polcode Sp. z o.o.",
        id: "20631-react-developer-bialystok-polcode-sp-z-o-o",
        location: "Białystok",
        position: "React Developer",
        salary: "6 000 - 12 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20631-react-developer-bialystok-polcode-sp-z-o-o",
      },
      {
        company: "StepStone Services",
        id: "21070-front-end-developer-react-net-warszawa-stepstone-services",
        location: "Warszawa",
        position: "Front-end Developer (React+.NET)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21070-front-end-developer-react-net-warszawa-stepstone-services",
      },
      {
        company: "Hello World! Sp. z o.o.",
        id: "21063-angular-frontend-developer-warszawa-hello-world-sp-z-o-o",
        location: "Warszawa, Zdalnie",
        position: "Angular Frontend Developer",
        salary: "7 000 - 10 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21063-angular-frontend-developer-warszawa-hello-world-sp-z-o-o",
      },
      {
        company: "Trineo Sp. z o.o.",
        id: "21058-team-leader-web-apps-gdynia-trineo-sp-z-o-o",
        location: "Gdynia",
        position: "Team Leader - Web Apps",
        salary: "15 000 - 17 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/21058-team-leader-web-apps-gdynia-trineo-sp-z-o-o",
      },
      {
        company: "Smartlocating Corporation",
        id: "17131-senior-frontend-developer-angular-smartlocating-corporation",
        location: "Remotely",
        position: "Senior Frontend Developer (Angular)",
        salary: "3 300 - 3 500 USD",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/17131-senior-frontend-developer-angular-smartlocating-corporation",
      },
      {
        company: "Scopic Software",
        id: "18619-reactjs-developer-scopic",
        location: "Remotely",
        position: "ReactJS Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/18619-reactjs-developer-scopic",
      },
      {
        company: "Sii Polska",
        id: "20909-front-end-developer-angular-warszawa-sii-polska",
        location: "Warszawa",
        position: "Front-end Developer (Angular)",
        salary: "16 000 - 20 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20909-front-end-developer-angular-warszawa-sii-polska",
      },
      {
        company: "Luxoft",
        id: "20010-middle-angular-js-developer-krakow-luxoft",
        location: "Kraków",
        position: "Middle Angular JS Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20010-middle-angular-js-developer-krakow-luxoft",
      },
      {
        company: "Luxoft",
        id: "20006-senior-front-end-developer-angular-warszawa-luxoft",
        location: "Warszawa",
        position: "Senior Front-End Developer (Angular)",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20006-senior-front-end-developer-angular-warszawa-luxoft",
      },
      {
        company: "AppUnite",
        id: "19566-front-end-developer-appunite",
        location: "Remotely",
        position: "Front-end Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19566-front-end-developer-appunite",
      },
      {
        company: "JCommerce",
        id: "19872-front-end-developer-i-react-e-commerce-poznan-jcommerce",
        location: "Poznań, Zdalnie",
        position: "Front-End Developer I React, e-commerce",
        salary: "Do 19 200 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19872-front-end-developer-i-react-e-commerce-poznan-jcommerce",
      },
      {
        company: "Kitopi",
        id: "19858-senior-frontend-developer-krakow-kitopi",
        location: "Kraków",
        position: "Senior Frontend Developer",
        salary: "14 000 - 19 000 PLN",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/19858-senior-frontend-developer-krakow-kitopi",
      },
      {
        company: "Luxoft",
        id: "20890-senior-front-end-react-developer-krakow-luxoft",
        location: "Kraków",
        position: "Senior Front End/React Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20890-senior-front-end-react-developer-krakow-luxoft",
      },
      {
        company: "Luxoft",
        id: "20888-senior-frontend-developer-krakow-luxoft",
        location: "Kraków",
        position: "Senior Frontend Developer",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/20888-senior-frontend-developer-krakow-luxoft",
      },
      {
        company: "HubSpot",
        id: "17311-senior-software-engineer-crm-hubspot",
        location: "Remotely",
        position: "Senior Software Engineer, CRM",
        salary: "",
        source: "bulldogjob",
        url:
          "https://bulldogjob.pl/companies/jobs/17311-senior-software-engineer-crm-hubspot",
      },
    ];

    const offer = bulldogMainParser(htmlData);
    expect(offer).to.eql(desiredOffer);
  });
});
