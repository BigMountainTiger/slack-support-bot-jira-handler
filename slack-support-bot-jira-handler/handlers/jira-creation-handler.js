const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;

const JiraClient = require('jira-connector');
const jiraMapper = require('./jira-mapper');

const create = async (request) => {
  const jira = new JiraClient({
    host: JIRA_HOST,
    basic_auth: {
      email: JIRA_AUTH_EMAIL,
      api_token: JIRA_AUTH_TOKEN
    }
  });

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

  const promise = new Promise((resolve, reject) => {
    jira.issue.createIssue(
      data, (error, issue) => { if (error) { reject(error); } else { resolve(issue); } }
    );
  });

  return await promise;
};

exports.create = create;

