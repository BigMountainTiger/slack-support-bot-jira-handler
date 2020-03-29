require('dotenv').config();

const slack = require('./handlers/slack-informer');

exports.lambdaHandler = async (event, context) => {
  //console.log(event);

  const USER = 'U01023BN1MX';
  let msg = {
    channel: USER,
    text: 'New message - ' + (new Date()).toLocaleString()
  };

  await slack.inform(msg);

  return {};
};