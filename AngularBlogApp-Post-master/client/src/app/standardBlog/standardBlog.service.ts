import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post.model';

const httpOptions = {
	headers: new HttpHeaders({
	'Content-Type':  'application/json',
	'x-access-token': localStorage.getItem('loggedInUserToken')
   })
};

@Injectable()
export class StandardBlogService {

	private restGatewayDev:string = '';
	private restGatewayProd:string = 'http://139.59.6.170:3000';
	private restGateway:string;

	constructor(private http: HttpClient){
		this.restGateway = this.restGatewayDev;
	}

	getAllPost(){
		return this.http.post(this.restGateway+'/api/post/getAllPost',{})
	}
	
	getPost(post_id){
		return this.http.post(this.restGateway+'/api/post/getPost',{
			id: post_id
		})
	}

	/* All below rest apis require authentication  token*/
	addPost(post){
		//return this.http.post(this.restGateway+'/api/post/createPost',post, httpOptions)
		post.token = localStorage.getItem('loggedInUserToken');
		return this.http.post(this.restGateway+'/api/post/createPost',post,httpOptions)
	}

	updatePost(post){
		post.token = localStorage.getItem('loggedInUserToken');
		return this.http.post(this.restGateway+'/api/post/updatePost', post,httpOptions)
	}

	
	deletePost(post){
		post.token = localStorage.getItem('loggedInUserToken');
		return this.http.post(this.restGateway+'/api/post/deletePost',post,httpOptions)
	}

}