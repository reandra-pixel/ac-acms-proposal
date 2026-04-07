const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const filePath = path.resolve(__dirname, 'index.html');
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
        path: path.resolve(__dirname, 'proposal.pdf'),
        format: 'Letter',
        printBackground: true,
        displayHeaderFooter: false,
        margin: {
            top: '0.5in',
            bottom: '0.5in',
            left: '0.6in',
            right: '0.6in'
        },
        preferCSSPageSize: false
    });

    console.log('PDF generated successfully');
    await browser.close();
})();
