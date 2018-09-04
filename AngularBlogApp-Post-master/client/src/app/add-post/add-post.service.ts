import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class AddPostService {
	private restGatewayDev:string = '';
	private restGatewayProd:string = 'http://139.59.6.170:3000';
	private restGateway:string;

	constructor(private http: HttpClient){
		this.restGateway = this.restGatewayProd;
	}
	
	addPost(post: Post){
		return this.http.post(this.restGateway+'/api/post/createPost',{
			title : post.title,
			description : post.description
		})
	}

	updatePost(post: Post){
		return this.http.post(this.restGateway+'/api/post/updatePost',{
			id: post._id,
			title : post.title,
			description : post.description
		})
	}

}