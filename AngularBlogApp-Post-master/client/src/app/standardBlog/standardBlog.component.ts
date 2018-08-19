import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { StandardBlogService } from './standardBlog.service';
import { Post } from '../models/post.model';
import { Router,ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'standard-blog',
  templateUrl: './standardBlog.component.html',
  styleUrls: ['./standardBlog.component.css'],
  providers: [ StandardBlogService ]
})
export class StandardBlogComponent implements OnInit {

   
    public htmlBlock:string;
    public post;
    public paras;
    public _id;

    constructor(private standardBlogService: StandardBlogService,private route: ActivatedRoute){
      this.route.params.subscribe( params => this._id = params );

    }
    ngOnInit(){
      
       this.getPost(this._id);
    }
   
    getPost(post_id){
      this.standardBlogService.getPost(post_id).subscribe(result => {
          console.log('result is ', result);
          this.post = result['data'];
          if(this.post.paragraphs){
            this.paras = this.post.paragraphs;
          }else this.paras = [];
         
      });
    }
    
   
}
