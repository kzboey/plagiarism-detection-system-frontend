
module.exports = {
	api: {
		//host: process.env.NODE_ENV === 'production' ? './' : 'http://127.0.0.1:5000',
		host: process.env.NODE_ENV === 'production' ? 'https://144.214.10.27' : 'http://127.0.0.1:5000',
		endpoint: {
			login: '/vtl/login',
			getTask : '/vtl/getTask',
			Users: '/vtl/users',
			user: '/vtl/user',
			getUser: '/vtl/me',
			getToken: '/vtl/token',
			refreshToken: '/vtl/refresh',
			tasks: '/vtl/tasks',
			task: '/vtl/task/',
			upload: '/vtl/upload/',
			submissions: '/vtl/submissions/',
			submission: '/vtl/submission/',
			getPages: '/vtl/pages',
			getContents: '/vtl/getContents',
			getContentsPids: '/vtl/getContentsPids',
			downloadImages: '/vtl/downloadpages/'
		},
	},
	right: '',
	request: {
		timeout: 20000 // 20s
	},
};
