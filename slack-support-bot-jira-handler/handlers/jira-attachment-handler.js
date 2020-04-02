require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');

const BOT_TOKEN = process.env.BOT_TOKEN;
const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;
const JIRA_ATTACHMENT_URL = process.env.JIRA_ATTACHMENT_URL;

const attachAFile = async (data) => {
  const jiraId = data.jiraId;
  const file = data.file;

  const slack_url = file.url_private;
  let options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + BOT_TOKEN
    },
    responseType: 'stream',
    url: slack_url,
  };

  const slack_res = await axios(options);
  const form = new FormData();
  form.append('file', slack_res.data);

  const jira_url = JIRA_ATTACHMENT_URL.replace('${jiraId}', jiraId);
  options = {
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'nocheck',
      'content-type': `multipart/form-data; boundary=${form._boundary}`
    },
    auth: { username: JIRA_AUTH_EMAIL, password: JIRA_AUTH_TOKEN },
    data: form,
    url: jira_url,
  };
  
  res = await axios(options);
};

const attach = async (request) => {
  const jiraId = request.jiraId;
  const files = request.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await attachAFile( { jiraId: jiraId, file: file });
  }

  return "All files are added correctly";
};

exports.attach = attach;