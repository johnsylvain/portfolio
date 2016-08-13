'use strict';

module.exports = {
	previousCommands: [
		{
			text: 'type \'help\' to view commands',
			type: 'response'
		}
	],
	commandPrefix: '$',
	currentOutput: null,
	mobileView: false,
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
		},
		{
			text: 'social',
			params: ['github', 'linkedin']
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
		position: "Full Stack Developer",
		contact:{
			email: "jsylvain007@gmail.com",
			phone: 3136180632,
			social: {
				github: 'http://github.com/johnsylvain',
				linkedin: 'http://linkedin.com/in/johnsylvain'
			}
		},
		education: {
			name: 'Purdue University',
			gradutionDate: 'May 2017',
			gpa: 3.98,
			area: {
				major: 'Computer Graphics Technology',
				minor: 'Computer Information Technology'
			}
		},
		experience: [
			{
				title: 'USAA',
				position: 'Software Development Intern',
				date: 'Summer 2016',
				description: [
					'Developed an AngularJS application to manage business rules for all employees',
					'Analyzed data and created visualizations for the Enterprise Systems Division.'
				]
			},
			{
				title: 'Blast Radius',
				position: 'Web Development Intern',
				date: 'Summer 2015',
				description: [
					'Developed websites and dynamic emails for a number of blue chip clients.',
					'Aided in the relaunch of the global Blast Radius website'
				]
			},
			{
				title: 'Freelance Web Development and Design',
				date: 'August 2014 - Present',
				description: [
					'Developed websites and graphics while building relationships with clients.',
					'Clients include: university organizations, professors, and career fairs.'
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
						'AngularJS','Vue.js', 'React.js','Node.js', 'Express.js', 'jQuery'
					]
				},
				{
					name: 'PHP',
					related: [
						'SQL', 'Slim', 'Flight'
					]
				},
				{
					name: 'C#',
					related: [
						'.NET',
					]
				}
			],
			technical: [
				'git','gulp','object oriented programming', 'linux', 'webpack'
			]

		}
	},

}
