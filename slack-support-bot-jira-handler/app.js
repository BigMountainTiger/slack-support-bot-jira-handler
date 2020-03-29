require('dotenv').config();

const jira = require('./handlers/jira-handler');
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
    const request = requests[i];

    console.log(request);

    let msgText = '';
    try {
      let result = await jira.create(request);
      msgText = 'Creating issue "' + request.request.summary + '" succeeded - @' + (new Date()).toLocaleString();
    } catch(e) {

      msgText = 'Creating issue "' + request.request.summary + '" failed - @' + (new Date()).toLocaleString()
        + ', please contact technical support.';
    }
    
    const msg = {
      channel: request.user.id,
      text: msgText
    };

    await slack.inform(msg);
  }

  return {};
};