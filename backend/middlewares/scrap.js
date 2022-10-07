const puppeteer = require('puppeteer');

async function scrap(url){
    const browser = await puppeteer.launch(); //{headless:false, args: ["--no-sandbox"]}
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
    // Approach 1:
    await page.goto(url);

    const [elat] = await page.$x("/html/body/div[1]/div/main/div/section[2]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]");
    const srcLat = await elat.getProperty("textContent");
    const jsonLat = await srcLat.jsonValue();

    const [elon] = await page.$x("/html/body/div[1]/div/main/div/section[2]/div/div[1]/div[1]/div[2]/div/div[1]/div[5]");
    const srcLon = await elon.getProperty("textContent");
    const jsonLon = await srcLon.jsonValue();

    // console.log({jsonLat,jsonLon});
    const res = {
        lat: parseFloat(jsonLat),
        lon: parseFloat(jsonLon)
    }
    await browser.close();
    return res;
}

//ejemplo de uso:
// scrap("http://www.vesselfinder.com/vessels/CAMPECHE-IMO-9096296-MMSI-345070219").then( res => {
//     console.log(res);
// })

module.exports = {
    scrap
}