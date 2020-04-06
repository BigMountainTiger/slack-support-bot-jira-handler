const axios = require('axios');
const jiraMapper = require('./jira-mapper');

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
    console.log(result);
    
    msgText = 'The issue "' + request.request.summary + '" created succeefully - @' + (new Date()).toLocaleString();
  } catch(e) {

    msgText = 'Unable to create issue "' + request.request.summary + '" - @' + (new Date()).toLocaleString()
      + ', please contact technical support.';
  }

  return msgText;
};

exports.create = create;

