const puppeteer = require('puppeteer');

(async () => {
    const inputName = process.argv[2];
    if (!inputName) {
        console.log('Please provide Fund Name to search.');
    } else {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://codequiz.azurewebsites.net');
        await page.click('input[value="Accept"]');
        await page.waitForSelector('table');
        const hotels = await page.$$eval('table > tbody > tr', anchors => {
            return anchors.map(anchor => anchor.textContent);
        });
        const tableData = await page.evaluate(() => {
            const trs = Array.from(document.querySelectorAll('table tr'));
            return Array.from(trs, tr => {
                const tds = tr.querySelectorAll('td');
                return Array.from(tds, td => td.innerText);
            });
        });
        await browser.close();
        tableData.map(row => {
            if(inputName === row[0]) {
                return console.log('NAV = ' + row[1]);
            }
        });
        return console.log('Not found Fund Name!')
    }
})()