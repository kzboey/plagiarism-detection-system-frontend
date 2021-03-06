import Config from '../app.config.js';
import {get,post} from '../util/HttpRequest'

export default class AppConfig {
	constructor() {
	}

	static getAPI(APIName) {
		if(Object.prototype.hasOwnProperty.call(Config.api.endpoint, APIName))
			return Config.api.host + Config.api.endpoint[APIName];
		else
			return '';
	}

	static setUserRight(right) {
		// Config.right = right;
		localStorage.setItem('user-right', right); 
	}

	static getUserRight() {
		// return Config.right;
		return localStorage.getItem('user-right') || ''
	}

	static setUserName(name) {
		// Config.right = right;
		localStorage.setItem('user-name', name); 
	}

	static getUserName() {
		// return Config.right;
		return localStorage.getItem('user-name') || ''
	}

	static getRequestTimeout() {
		return Config.request.timeout;
	}

	static setToken(token) {
		localStorage.setItem('user-token', token); 
	}

	static setRefreshToken(token) {
		localStorage.setItem('refresh-token', token); 
	}
	
	static getToken() {
		return localStorage.getItem('user-token') || ''
	}

	static getRefreshToken() {
		return localStorage.getItem('refresh-token') || ''
	}

	static refreshToken(){
		const REFRESH_TOKEN = AppConfig.getRefreshToken()
		const AuthStr = 'Bearer '.concat(REFRESH_TOKEN); 
		post(AppConfig.getAPI('refreshToken'),{},{Authorization: AuthStr}).then(resp =>{
			if(resp != undefined && resp.code == 0){
                AppConfig.setToken(resp.data.token);
            }
        })   
	}

}
