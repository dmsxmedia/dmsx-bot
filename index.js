const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('DMSX Media WhatsApp Bot is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ],
    }
});

client.on('qr', (qr) => {
    console.log('SCAN THIS QR CODE IN RAILWAY LOGS:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('DMSX Bot එක සාර්ථකව සූදානම්!');
});

client.on('message', async msg => {
    if (msg.body === '!hi') {
        msg.reply('හෙලෝ! මම DMSX Media ස්වයංක්‍රීය සහායකයා.');
    }
});

client.initialize();
