const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="imgBlkFront"]');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="buyNewSection"]/div/div/span/span');
    const txt2 = await el3.getProperty('textContent');
    const price = txt2.jsonValue();

    console.log({imgURL, title, price});

    browser.close();
}

scrapeProduct('https://www.amazon.co.uk/HTML-CSS-Design-Build-Websites/dp/1118008189/ref=sr_1_3?dchild=1&keywords=jon+duckett&qid=1612765410&sr=8-3');
