import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class StandardBlogService {

	constructor(private http: HttpClient){

	}
	
	getPost(post_id){
		return this.http.post('/api/post/getPost',{
			id: post_id
		})
	}

}