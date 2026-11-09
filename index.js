const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode'); // Change package
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
    // මේකෙන් Railway Logs වලට QR කෝඩ් එකට අදාළ ලින්ක් එකක් එනවා, ඒක බ්‍රව්සර් එකේ ඕපන් කරලා ස්කෑන් කරන්න පුළුවන්
    console.log('QR RECEIVED, open this link in browser to scan if terminal fails:');
    console.log('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(qr));
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
