require('dotenv').config();

const slack = require('./handlers/slack-informer');

const getRequests = (event) => {
  let requests = [];

  for ( const {body} of (event.Records || [])) {
    requests.push(JSON.parse(body));
  }

  return requests;
};

exports.lambdaHandler = async (event, context) => {
  const requests = getRequests(event);

  for (let i = 0; i < requests.length; i++) {
    const r = requests[i];

    console.log(r);
    const USER = r.user.id;
    const msg = {
      channel: USER,
      text: 'New message - ' + r.user.name + ' - ' + (new Date()).toLocaleString()
    };

    await slack.inform(msg);
  }

  return {};
};