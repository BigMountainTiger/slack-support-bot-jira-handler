const formatDate = (d) => {
  const month = parseInt(d.getMonth() + 1);
  const day = parseInt(d.getDate());
  const year = d.getFullYear();

  if (month.length < 2)  month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const createMapper = (request) => {
  const user = request.user.name;
  const r = request.request;

  let r = {
      summary: 'This is the summary ',
      description: 'OK',
      affected_application: 'CRM',
      priority: 'NORMAL',
      duedate: '4/12/2020',
      justification: null
    };

  const data = {

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

  return {
    summary: () => {
      return r.summary;
    },
    description: () => {
      return r.description;
    },
    reporterId: () => {
      return '5e7e9cec1e65980c42c12b5d';
    },
    assigneeId: () => {
      return '5e7e9cec1e65980c42c12b5d';
    },
    duedate: () => {
      let ddate = r.duedate;


    },
    labels: () => {
      return [user];
    }
  }
};

exports.createMapper = createMapper;