const formatDate = (d) => {
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear().toString();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const createMapper = (request) => {
  const user = request.user.name;
  const r = request.request;

  return {
    projectKey: () => {
      return 'GSD';
    },
    summary: () => {
      return r.summary;
    },
    description: () => {
      return r.description;
    },
    reporterId: () => {
      return '5d727c657dfaa80d90542b1e';
    },
    assigneeId: () => {
      return '5d727c657dfaa80d90542b1e';
    },
    duedate: () => {
      return formatDate(new Date(r.duedate))
    },
    labels: () => {
      return [user, r.affected_application];
    },
    priorityName: () => {
      if (r.priority === 'NORMAL') {
        return 'Medium';
      }
      else {
        return 'High';
      }
    },
    issuetypeName: () => {
      return 'Email request';
    }
  }
};

exports.createMapper = createMapper;