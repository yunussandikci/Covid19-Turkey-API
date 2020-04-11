const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const scraper = require('./scraper.js');
const app = express();
const SITE_URL = "https://covid19.saglik.gov.tr/";

async function getSite() {
    return axios.get(SITE_URL).then(res => res)
}

app.get('/', async (req, res) => {
    var siteResponse =  await getSite();
    const siteData = cheerio.load(siteResponse.data);
    const data = {
        "today": scraper.getToday(siteData),
        "total": scraper.getTotal(siteData),
        "timeline": scraper.getTimeline(siteData)
    };
    await res.json(data);
});

app.listen(3000, () => console.log(`API listening at http://localhost:${3000}`));
