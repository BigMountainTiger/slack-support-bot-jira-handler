const axios = require('axios');
const jiraMapper = require('./jira-mapper');

const BOT_APP_NAME = process.env.BOT_APP_NAME;
const JIRA_CREATE_URL = process.env.JIRA_CREATE_URL;
const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;

const mappData = (request) => {
  const m = jiraMapper.createMapper(request);

  const data = {

    fields: {
      project: { key: m.projectKey() },
      summary: m.summary(),
      description: m.description(),
      reporter: {
        accountId: m.reporterId()
      },
      assignee: {
        accountId: m.assigneeId()
      },
      duedate: m.duedate(),
      labels: m.labels(),
      priority: {
        name: m.priorityName()
      },
      issuetype: { name: m.issuetypeName() },
    }
  };

  return data;
}

const create = async (request) => {
  let data = {}
  try {
    data = mappData(request);
  } catch(e) {
    return 'Unable to understand the issue request - @' + (new Date()).toLocaleString();
  }
  
  options = {
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'nocheck',
      'content-type': 'application/json'
    },
    auth: { username: JIRA_AUTH_EMAIL, password: JIRA_AUTH_TOKEN },
    data: data,
    url: JIRA_CREATE_URL,
  };

  let msgText = '';
  try {
    const result = await axios(options);
    const key = result.data.key;
    const summary = request.request.summary;

    msgText = `*The issue created successfully @ ${(new Date()).toLocaleString()}*\n\n`
      + `*Issue Key:* ${key}\n`
      + `*Issue Summary:* ${summary}\n\n`
      + `To attach a file to the issue, upload the file to "*${BOT_APP_NAME}*" `
      + `and type the issue key ${key} (*Issue key only*) in the message when share the file.\n`;

  } catch(e) {
    const summary = request.request.summary;

    msgText = `*Unable to create issue:* ${summary}\n`
      + `@ ${(new Date()).toLocaleString()}\n\n`
      + `Please contact technical support.\n`;
  }

  return msgText;
};

exports.create = create;

