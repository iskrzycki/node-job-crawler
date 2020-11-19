const knownCurrencies = ["PLN", "EUR", "USD"]; // TODO verify

const salaryParser = (salaryString, desc) => {
  let currency;
  let str = salaryString;

  knownCurrencies.some((el) => {
    if (str.includes(el)) {
      currency = el;
      str = str.replace(currency, "").trim();
      return true;
    }
  });

  const splitted = str.split("-").map((x) => parseInt(x.trim()));

  return {
    currency,
    min: Math.min(...splitted),
    max: Math.max(...splitted),
    desc,
  };
};

exports.salaryParser = salaryParser;
