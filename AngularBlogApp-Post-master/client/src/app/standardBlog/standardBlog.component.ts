import { Component,OnInit,AfterViewInit } from '@angular/core';
import { StandardBlogService } from './standardBlog.service';
import { Post } from '../models/post.model';
import { Router,ActivatedRoute } from '@angular/router';

declare var jQuery:any;
 
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

    constructor(private standardBlogService: StandardBlogService,private route: ActivatedRoute,private router: Router){
      this.route.params.subscribe( params => this._id = params._id );

    }
    ngOnInit(){
      if(this._id){
        this.getPost(this._id);
      }
      else {
        this.router.navigate(['/home']);
      }
      
    }

    ngAfterViewInit(){
        this.preloader();
    }

    preloader(){
       // will first fade out the loading animation 
       jQuery("#loader").fadeOut("slow", function() {
          // will fade out the whole DIV that covers the website.
          jQuery("#preloader").delay(300).fadeOut("slow");
      }); 
    
      // for hero content animations 
      jQuery("html").removeClass('cl-preload');
      jQuery("html").addClass('cl-loaded');
    }
   
    getPost(post_id){
      this.standardBlogService.getPost(post_id).subscribe(result => {
          //console.log('result is ', result);
          this.post = result['data'];
          if(this.post.paragraphs){
            this.paras = this.post.paragraphs;
          }else this.paras = [];
         
      });
    }
    
   
}
