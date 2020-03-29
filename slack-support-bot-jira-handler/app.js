require('dotenv').config();

const { WebClient } = require('@slack/web-api');

const BOT_TOKEN = process.env.BOT_TOKEN;
const USER = 'U01023BN1MX';

exports.lambdaHandler = async (event, context) => {
  
  const web = new WebClient(BOT_TOKEN);

  await web.chat.postMessage({
    channel: USER,
    text: 'New message'
  });

  return {};
};