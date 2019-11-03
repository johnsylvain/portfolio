export default {
  name: 'John Sylvain',
  title: 'Software Engineer',
  'business-card': 'npx johnsylvain',
  contact: {
    github: 'http://github.com/johnsylvain',
    linkedin: 'http://linkedin.com/in/johnsylvain'
  },
  education: {
    school: 'Purdue University',
    'graduation-date': 'May 2017',
    study: {
      major: 'Computer Graphics Technology',
      minor: 'Computer Information Technology'
    }
  },
  experience: [
    {
      company: 'Rocketmiles',
      position: 'Software Engineer',
      date: 'October 2017 - present',
      description: [
        'Led the process of migrating legacy AngularJS applications to React and TypeScript',
        "Architected profitable features for the company's flagship white-label product",
        'Constructed and maintained an internal, cross-product UI component library',
        'Created insightful A/B tests, leading to increased conversions'
      ]
    },
    {
      company: 'USAA',
      position: 'Software Developer',
      date: 'Summer 2016',
      description: [
        'Worked on an agile team primarily focused on enterprise applications',
        'Developed a Restful application to manage business rules'
      ]
    },
    {
      company: 'Blast Radius',
      position: 'Web Developer',
      date: 'Summer 2015'
    }
  ],
  projects: [
    {
      title: 'Slack Colors',
      description: 'AI Slack themes',
      links: {
        demo: 'https://slackcolors.com',
        github: 'http://github.com/johnsylvain/slack-colors'
      }
    },
    {
      title: 'Popcover',
      description: 'Spotify Playlist Creator',
      links: {
        demo: 'https://popcover.pro',
        github: 'http://github.com/johnsylvain/pop-cover'
      }
    },
    {
      title: 'Streamit',
      description: 'Reddit Video streamer',
      links: {
        demo: 'https://streamit.space',
        github: 'http://github.com/johnsylvain/streamit'
      }
    },
    {
      title: 'Kobra',
      description: 'Minimal JavaScript Framework',
      links: {
        docs: 'https://kobra.js.org',
        github: 'https://github.com/johnsylvain/kobra'
      }
    }
  ],
  skills: {
    languages: [
      'JavaScript (esnext)',
      'TypeScript',
      'CSS (Sass, Less)',
      'HTML'
    ],
    'frameworks-and-libraries': [
      'React',
      'Redux',
      'Express',
      'Node',
      'Angular'
    ],
    'web-tooling': ['git', 'webpack', 'gulp', 'bash'],
    database: ['GraphQL', 'SQL', 'MongoDB', 'Mongoose']
  }
};
