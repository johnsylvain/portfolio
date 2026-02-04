export default {
  name: 'John Sylvain',
  occupation: 'Senior Software & Systems Engineer',
  profiles: {
    artifactLab: 'https://artifactlab.net',
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
      company: 'Outfit',
      position: 'Lead Software Engineer',
      date: 'August 2025 - Present'
    },
    {
      company: 'ChaChing',
      position: 'Senior Software Engineer',
      date: 'October 2023 - August 2025'
    },
    {
      company: 'Vintro',
      position: 'Senior Software Engineer',
      date: 'October 2021 - October 2023'
    },
    {
      company: 'Coda Collection',
      position: 'Senior Software Engineer',
      date: 'July 2020 - October 2021'
    },
    {
      company: 'Rocketmiles',
      position: 'Software Engineer',
      date: 'October 2017 - July 2020'
    }
  ],
  projects: [
    {
      title: 'Artifact Lab',
      description:
        'Private design studio for physical computing, embedded systems, and networked objects. Focused on constraint-aware design, durability, and human-scale interaction.',
      links: {
        site: 'https://artifactlab.net'
      }
    },
    {
      title: 'RoboGlobe',
      description:
        'Two-axis robotic globe driven by an ESP32 and PCA9685. Explores coordinated motion control, mechanical constraints, and deterministic embedded behavior.',
      github: 'https://github.com/johnsylvain/roboglobe'
    },
    {
      title: 'Ambient Display Unit',
      description:
        'Miniature CRT-based ambient display for system state. Glanceable, non-interactive, and locally controlled via a web interface.',
      github: 'https://github.com/johnsylvain/crt-hud'
    },
    {
      title: 'ColdVault',
      description:
        'Containerized system for scheduled backups to cold storage with cost, lifecycle, and health visibility. Emphasizes durability over feature velocity.',
      github: 'https://github.com/johnsylvain/coldvault'
    },
    {
      title: 'Slack Colors',
      description: 'AI Slack themes',
      links: {
        demo: 'https://slackcolors.com',
        github: 'http://github.com/johnsylvain/slack-colors'
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
    languages: ['JavaScript', 'TypeScript', 'Python', 'Bash'],
    frameworksAndLibraries: [
      'React',
      'Redux',
      'Node',
      'Express',
      'Nest.js',
      'WebSockets'
    ],
    webTooling: ['git', 'Docker', 'Linux', 'webpack'],
    backend: ['Postgres', 'Redis', 'Kafka', 'GraphQL', 'REST APIs'],
    embeddedHardware: ['ESP32', 'Raspberry Pi', 'I2C'],
    fabrication: ['Fusion 360', 'rapid prototyping'],
    systems: ['Linux networking', 'self-hosting']
  }
};
