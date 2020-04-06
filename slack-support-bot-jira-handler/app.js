require('dotenv').config();

const jiraCreationHandler = require('./handlers/jira-creation-handler');
const jiraAttachmentHandler = require('./handlers/jira-attachment-handler');
const slack = require('./handlers/slack-informer');

const getRequests = (event) => {
  let requests = [];

  for ( const {body} of (event.Records || [])) {
    requests.push(JSON.parse(body));
  }

  return requests;
};

exports.lambdaHandler = async (event, context) => {
  let requests = [];
  try {
    requests = getRequests(event);
  } catch(e) {
    console.error('Unable to parse the SQS event');
    console.error(event);

    return {};
  }

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];

    let msgText = 'Unknow Request';
    if (request.type === 'DIALOG') {
      msgText = await jiraCreationHandler.create(request);
    }
    
    if (request.type === 'ATTACHMENT') {
      msgText = await jiraAttachmentHandler.attach(request);
    }
    
    await slack.inform({
      channel: request.user.id,
      text: msgText
    });
  }

  return {};
};