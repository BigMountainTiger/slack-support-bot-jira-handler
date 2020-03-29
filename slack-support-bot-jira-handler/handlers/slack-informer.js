const BOT_TOKEN = process.env.BOT_TOKEN;
const USER = 'U01023BN1MX';

const { WebClient } = require('@slack/web-api');

const inform = async (msg) => {

  const web = new WebClient(BOT_TOKEN);
  await web.chat.postMessage(msg);
};

exports.inform = inform;

