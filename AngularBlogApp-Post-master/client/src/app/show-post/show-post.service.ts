import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class ShowPostService {

	private restGatewayDev:string = '';
	private restGatewayProd:string = 'http://139.59.6.170:3000';
	private restGateway:string;

	constructor(private http: HttpClient){
		this.restGateway = this.restGatewayProd;
	}
	
	getAllPost(){
		return this.http.post(this.restGateway+'/api/post/getAllPost',{})
	}

	getAllFavPost(){
		return this.http.post(this.restGateway+'/api/post/getAllFavPost',{})
	}

	deletePost(id){
		return this.http.post(this.restGateway+'/api/post/deletePost',{id : id})
	}

}