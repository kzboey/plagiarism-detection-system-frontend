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

	static getDefaultLocale() {
		return Config.locale.default;
	}

	static getSupportedLocale() {
		return Config.locale.support;
	}

	static getRequestTimeout() {
		return Config.request.timeout;
	}

	static getImpMainPage() {
		return Config.imp.mainPage;
	}
}
