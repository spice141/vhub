import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StandardBlogService } from './standardBlog.service';
import { Post } from '../models/post.model';
import { CommonService, } from '../service/common.service';
import { Router } from '@angular/router';
 
@Component({
    selector: 'modify-standard-blog',
    templateUrl: './modifyStandardBlog.component.html',
    styleUrls: ['./modifyStandardBlog.component.css'],
    providers: [ StandardBlogService ]
  })
export class ModifyStandardBlogComponent implements OnInit {
 
  @ViewChild('closeBtn') closeBtn: ElementRef;
 
  public posts : any [];
  public post_to_delete;
 
  constructor(private showPostService: StandardBlogService, private commonService: CommonService, private router: Router) {
       
  }
 
  ngOnInit(){
    this.getAllPost();
 
    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
  }
 
 
  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
        console.log('result is ', result);
        this.posts = result['data'];
    });
  }
 
  editPost(post: Post){
    this.router.navigate(['/createpost/'+post._id]);
  }
 
  deletePost(post){
    this.showPostService.deletePost(post._id).subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    })
  }

  onCardClick(post:Post){
    this.router.navigate(['/stdBlog',post._id]);
  }
 
}