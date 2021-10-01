
module.exports = {
	api: {
		host: process.env.NODE_ENV === 'production' ? './' : 'http://127.0.0.1:5000/',
		endpoint: {
			getLogin: 'login',
			getTask : 'getTask'
		},
	},
	request: {
		timeout: 20000 // 20s
	},
};
