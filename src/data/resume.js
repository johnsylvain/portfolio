export default {
  name: 'John Sylvain',
  occupation: 'Senior Software Engineer',
  profiles: {
    github: 'https://github.com/johnsylvain',
    linkedin: 'https://linkedin.com/in/johnsylvain',
    spotify:
      'https://open.spotify.com/artist/4nEeXjmnkJHJG6xrRBK0bp?si=VBakI3tqSbukGo6VymkrUQ'
  },
  businessCard: 'npx johnsylvain',
  education: {
    school: 'Purdue University',
    graduationDate: 'May 2017',
    study: {
      major: 'Computer Graphics Technology',
      minor: 'Computer Information Technology'
    }
  },
  experience: [
    {
      company: 'Rocketmiles',
      position: 'Software Engineer',
      date: 'October 2017 - July 2020'
    },
    {
      company: 'Coda Collection',
      position: 'Senior Software Engineer',
      date: 'July 2020 - October 2021'
    },
    {
      company: 'Vintro',
      position: 'Senior Software Engineer',
      date: 'October 2021 - October 2023'
    },
    {
      company: 'ChaChing',
      position: 'Senior Software Engineer',
      date: 'October 2023 - Present'
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
    // {
    //   title: 'Popcover',
    //   description: 'Spotify Playlist Creator',
    //   links: {
    //     demo: 'https://popcover.pro',
    //     github: 'http://github.com/johnsylvain/pop-cover'
    //   }
    // },
    // {
    //   title: 'Streamit',
    //   description: 'Reddit Video streamer',
    //   links: {
    //     demo: 'https://streamit.space',
    //     github: 'http://github.com/johnsylvain/streamit'
    //   }
    // },
    {
      title: 'Kobra',
      description: 'Minimal JavaScript Framework',
      links: {
        docs: 'https://kobra.js.org',
        github: 'https://github.com/johnsylvain/kobra'
      }
    }
    // {
    //   title: 'Fileary',
    //   description: 'Simple and secure file sharing',
    //   links: {
    //     demo: 'https://fileary.com'
    //   }
    // }
  ],
  skills: {
    languages: ['JavaScript', 'TypeScript', 'CSS (Sass, Less)', 'HTML'],
    frameworksAndLibraries: [
      'React',
      'Redux',
      'Express',
      'Node',
      'Angular',
      'Nest.js'
    ],
    webTooling: ['git', 'webpack', 'gulp', 'bash'],
    backend: ['GraphQL', 'Postgres', 'Kafka', 'Redis']
  }
};
