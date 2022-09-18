const defaultProject = {
  name: 'Project Mars (Demo)',
  keywords: ['MARS', 'LANDING', 'HUMANS'],
  description: 'The first crewed mission to Mars.',
  status: 'new',
  tasks: [
    {
      task: 'Rover exploration.',
      key: '1',
      isCompleted: true,
    },
    {
      task: 'Send base components',
      key: '2',
      isCompleted: false,
    },
    {
      task: 'Send crew to Mars.',
      key: '3',
      isCompleted: false,
    },
    {
      task: 'Build base.',
      key: '4',
      isCompleted: false,
    },
    {
      task: 'Return crew from Mars.',
      key: '5',
      isCompleted: false,
    },
  ],
};

module.exports = defaultProject;
