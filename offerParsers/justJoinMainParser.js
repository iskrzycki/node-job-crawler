const justJoinMainParser = (offers) =>
  offers.map(
    ({
      id,
      title,
      salary_from,
      salary_to,
      salary_currency,
      remote,
      city,
      country_code,
      company_name,
      published_at,
    }) => ({
      id,
      url: `https://justjoin.it/offers/${id}`,
      position: title,
      salary:
        salary_from && salary_to
          ? `${salary_from} - ${salary_to} ${salary_currency.toUpperCase()}`
          : "?",
      location: remote ? "Remote" : `${city}, ${country_code}`,
      company: company_name,
      source: "justjoinit",
      publishedAt: published_at,
    })
  );

// TODO consider using published_at to filter out some old offers

exports.justJoinMainParser = justJoinMainParser;
