import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

	private restGatewayDev:string = '';
	private restGatewayProd:string = 'http://139.59.6.170:3000';
	private restGateway:string;

	constructor(private http: HttpClient){
		this.restGateway = this.restGatewayProd;
	}
	
	validateLogin(user: User){
		return this.http.post(this.restGateway+'/api/user/login',{
			username : user.username,
			password : user.password
		})
	}

}