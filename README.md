# Covid-19 Turkey API
This a basic api implementation which scrapes `https://covid19.saglik.gov.tr/` and returns data that scraped in meaningful json.
It uses `axios` for getting site data, `cheerio` for scraping and `express` for a request handler.

# Capabilities
  - Tests, cases, deaths, recovered patient counts of Today.
  - Total count of recovered, intubated, intensive, death, case and tests.
  - Time-series of case and deaths.

## Installation and Run
```
npm install && npm start
```

## Endpoints
It has one endpoint which is `/` that returns all data.

## Sample
You can find sample response [here](https://github.com/yunussandikci/Covid19-Turkey-API/blob/master/sample.json)

### Tech
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Cheerio](https://github.com/cheeriojs/cheerio) - Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
* [Express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node.


