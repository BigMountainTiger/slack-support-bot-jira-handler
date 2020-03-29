const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;

const JiraClient = require("jira-connector");

const create = async (request) => {
  const jira = new JiraClient({
    host: JIRA_HOST,
    basic_auth: {
      email: JIRA_AUTH_EMAIL,
      api_token: JIRA_AUTH_TOKEN
    }
  });

  let data = {

    fields: {
      project: { key: 'SLE' },
      summary: 'This is the summary No.1',
      description: 'Creating of an issue using project keys and issue type names using the REST API',
      reporter: {
        accountId: '5e7e9cec1e65980c42c12b5d'
      },
      assignee: {
        accountId: '5e7e9cec1e65980c42c12b5d'
      },
      duedate: '2020-04-12',
      labels: [ 'da_tou_li' ],
      priority: {
        name: 'Medium'
      },
      issuetype: { name: 'Bug' },
    }
  };

  jira.issue.createIssue(
    data, (error, issue) => {
      console.log(error);
      console.log(issue);
    }
  );

  // let request = new Promise((resolve, reject) => {
  //   sqs.sendMessage(params, (err, data) => {
  //     if (err) { reject(err); } else { resolve(data.MessageId) }
  //   });
  // });

};

exports.create = create;

