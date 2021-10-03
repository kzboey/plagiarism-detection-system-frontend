import Config from '../app.config.js';

export default class AppConfig {
	constructor() {
	}

	static getAPI(APIName) {
		if(Object.prototype.hasOwnProperty.call(Config.api.endpoint, APIName))
			return Config.api.host + Config.api.endpoint[APIName];
		else
			return '';
	}

	static getRequestTimeout() {
		return Config.request.timeout;
	}

}
