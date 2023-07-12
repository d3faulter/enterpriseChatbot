const restify = require('restify');
const { CloudAdapter } = require('botbuilder');
const { EchoBot } = require('./index.js');
require('dotenv').config();

const adapter = new CloudAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const bot = new EchoBot();

const server = restify.createServer();
server.listen(3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

server.post(`${process.env.NGROK_URL}/api/messages`, async (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    }).catch((err) => {
        console.error(err);
        res.send(500);
    });
});
