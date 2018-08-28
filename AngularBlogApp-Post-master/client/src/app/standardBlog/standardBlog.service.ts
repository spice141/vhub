import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';


@Injectable()
export class StandardBlogService {

	constructor(private http: HttpClient){

	}
	
	getPost(post_id){
		return this.http.post('/api/post/getPost',{
			id: post_id
		})
	}

	addPost(post: Post){
		return this.http.post('/api/post/createPost',post)
	}

	updatePost(post: Post){
		return this.http.post('/api/post/updatePost', post)
	}

	getAllPost(){
		return this.http.post('/api/post/getAllPost',{})
	}

	deletePost(id){
		return this.http.post('/api/post/deletePost',{id : id})
	}

}