import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { Post } from '../models/post.model';
import { CommonService, } from '../service/common.service';
import { Router } from '@angular/router';

declare var jQuery:any;


 
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
  providers: [ ShowPostService ]
})
export class ShowPostComponent implements OnInit {
 
  @ViewChild('closeBtn') closeBtn: ElementRef;
 
  public posts : any [];
  public post_to_delete;
  public favPost1:any;
  public favPost2:any;
  public favPost3:any;
  public searchText:string;
 
  constructor(private showPostService: ShowPostService, private commonService: CommonService, private router: Router) {
       
  }
 
  ngOnInit(){
    this.getAllPost();
    this.getFavPosts();
    
    // this.commonService.postAdded_Observable.subscribe(res => {
    //   this.getAllPost();
    //   this.getFavPosts();
    // });
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
 
  setDelete(post: Post){
    this.post_to_delete = post;
    this.deletePost();
  }
 
  unsetDelete(){
    this.post_to_delete = null;
  }
 
  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
       this.posts = result['data'];
    });
  }
 
  getFavPosts(){
    this.showPostService.getAllFavPost().subscribe(result => {
     let favPostArray = result['data'];
     this.favPost1 = favPostArray[0];
     this.favPost2 = favPostArray[1];
     this.favPost3 = favPostArray[2];
  });
  }

  editPost(post: Post){
    this.commonService.setPostToEdit(post);
  }
 
  deletePost(){
    this.showPostService.deletePost(this.post_to_delete._id).subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    })
  }

  onCardClick(post:Post){
    this.router.navigate(['/stdBlog',post._id]);
  }

  onFavPostClick(favPost){
    this.router.navigate(['/stdBlog',favPost.post_id]);
  }
 
}