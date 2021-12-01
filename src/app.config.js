
module.exports = {
	api: {
		host: process.env.NODE_ENV === 'production' ? './' : 'http://127.0.0.1:5000',
		endpoint: {
			login: '/vtl/login',
			getTask : '/vtl/getTask',
			users: '/vtl/users',
			getUser: '/vtl/me',
			getToken: '/vtl/token',
			refreshToken: '/vtl/refresh',
			tasks: '/vtl/tasks',
			task: '/vtl/task/',
			upload: '/vtl/upload/',
			submissions: '/vtl/submissions/',
			deleteSubmission: '/vtl/submission/',
			contents: '/vtl/contents',
		},
	},
	request: {
		timeout: 20000 // 20s
	},
};
