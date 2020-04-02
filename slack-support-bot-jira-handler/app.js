require('dotenv').config();

const jiraCreator = require('./handlers/jira-creation-handler');
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

    let msgText = '';
    try {
      let result = await jiraCreator.create(request);
      msgText = 'The issue "' + request.request.summary + '" created succeefully - @' + (new Date()).toLocaleString();
    } catch(e) {
      msgText = 'Unable to create issue "' + request.request.summary + '" - @' + (new Date()).toLocaleString()
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