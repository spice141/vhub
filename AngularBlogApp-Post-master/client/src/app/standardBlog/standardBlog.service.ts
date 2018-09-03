import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';


@Injectable()
export class StandardBlogService {

	private restGatewayDev:string = '';
	private restGatewayProd:string = 'http://139.59.6.170:3000';
	private restGateway:string;

	constructor(private http: HttpClient){
		this.restGateway = this.restGatewayDev;
	}
	
	getPost(post_id){
		return this.http.post(this.restGateway+'/api/post/getPost',{
			id: post_id
		})
	}

	addPost(post: Post){
		return this.http.post(this.restGateway+'/api/post/createPost',post)
	}

	updatePost(post: Post){
		return this.http.post(this.restGateway+'/api/post/updatePost', post)
	}

	getAllPost(){
		return this.http.post(this.restGateway+'/api/post/getAllPost',{})
	}

	deletePost(id){
		return this.http.post(this.restGateway+'/api/post/deletePost',{id : id})
	}

}