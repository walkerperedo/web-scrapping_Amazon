const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://www.amazon.es");
  await page.waitForSelector("#twotabsearchtextbox");
  await page.type("#twotabsearchtextbox", "web development");
  await page.waitForSelector("#nav-search-submit-button");
  await page.click("#nav-search-submit-button");
  await page.waitForSelector("[data-component-type=s-search-result]");

  const infoText = await page.evaluate(() => {
    const info = document.querySelectorAll(
      "[data-component-type=s-search-result]"
    );

    const infoText = [];

    for (const el of info) {
      infoText.push(el.innerText);
    }

    return infoText.map((el) => {
      const info = el.split("\n");
      return {
        title: info[0],
        edition: info[1],
        autor: info[2],
        stars: info[3],
        sells: info[4],
        version: `${info[5]},${info[6]}`,
      };
    });
  });

  await page.screenshot({
    path: path.join(__dirname, `amazon.png`),
  });

  fs.writeFileSync(
    path.join(__dirname, `amazon.json`),
    JSON.stringify(infoText),
    "utf8"
  );
})();
