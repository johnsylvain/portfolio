var model = {
  previousCommands: [
    {
      text: 'type \'help\' to view commands',
      type: 'response'
    }
  ],
  commandPrefix: '$',
  currentOutput: null,
  commands: [
    {
      text: '',
      params:  null
    },
    {
      text: 'help',
      params: null
    },
    {
      text: 'email',
      params: ['<subject>']
    },
    {
      text: 'open',
      params: ['resume']
    },
    {
      text: 'show',
      params: ['education', 'skills', 'xp']
    }
  ],
  defaultMessage: {
    message: [
      "to view the resume, enter 'open resume' in the terminal to the left",
      "type 'help' to view other commands"
    ]
  },
  data: {
    name: "John Sylvain",
    position: "Web developer and designer",
    contact:{
      email: "me@johnsylva.in",
      phone: 3136180632,
      social: {
        github: 'http://github.com/johnsylvain',
        linkedin: 'http://linkedin.com/in/johnsylvain'
      }
    },
    education: {
      name: 'Purdue University',
      gradutionDate: 'May 2017',
      gpa: 3.97,
      area: {
        major: 'Computer Graphics Technology',
        minor: 'Computer Information Technology'
      }
    },
    experience: [
      {
        title: 'Blast Radius',
        position: 'Web Development Intern',
        date: 'Summer 2015',
        description: [
          'Developed interactive website experiences for a variety of clients.',
          'Collaborated with professionals in web development and design.'
        ]
      },
      {
        title: 'Freelance Graphic Design',
        date: 'August 2014 - Present',
        description: [
          'Consulted with clients to produce designs and marketing materials',
          'Clients include: Organizaions, Student Government Campaigns, and Career Fairs'
        ]
      },
      {
        title: 'Eagle Scout',
        date: 'June 2013',
        description: [
          'Oversaw the development and conducted a community service project.',
          'Resulted in more than 150 hours of service.'
        ]
      }
    ],
    skills: {
      languages: [
        {
          name: 'HTML/CSS',
          related: [
            'SASS', 'jade'
          ]
        },
        {
          name: 'JavaScript',
          related: [
            'AngularJS','Vue.js', 'Node.js', 'Express.js', 'jQuery'
          ]
        },
        {
          name: 'PHP',
          related: [
            'SQL', 'Slim', 'Flight'
          ]
        }
      ],
      technical: [
        'git','gulp',
      ]

    }
  },

}