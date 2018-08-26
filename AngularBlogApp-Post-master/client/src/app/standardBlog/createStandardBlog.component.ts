import { Component,OnInit } from '@angular/core';
import { StandardBlogService } from './standardBlog.service';
import { Post } from '../models/post.model';
import { Router,ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'create-standard-blog',
  templateUrl: './createStandardBlog.component.html',
  styleUrls: ['./createStandardBlog.component.css'],
  providers: [ StandardBlogService ]
})
export class CreateStandardBlogComponent implements OnInit {
    private routerParams;
    private _userId;
    private _password;
    private _allowAccess:boolean = false;
    private postObj:any;
    private paragraphs = [];

    constructor(private standardBlogService: StandardBlogService, private route: ActivatedRoute){
      this.route.params.subscribe( params => this.routerParams = params);
    }

    ngOnInit(){
      this._userId = this.routerParams._userId;
      this._password=this.routerParams._password;
        if(this._userId == "venki" && this._password == "1234"){
          this._allowAccess = true;
          this.initStdPostObj();
        }
    }

private initStdPostObj(){
    this.postObj = {
      "title": "",
      "description": "",
      "date": "26/08/2018",
      "asscField": "",
      "leadImage": "",
      "leadText": "",
      "leadTextCont": "",
      "paragraphs": []
    };
  }

private getNewParagraphObj(){
  let paraObj = {
    "image": "",
    "heading": "",
    "content": "",
    "quote": "",
    "contContent": ""
  };
  return paraObj;
}

private addButtonClick(){
  this.paragraphs.push(this.getNewParagraphObj());
}

private removeButtonClick(paraObj){
  let  index = this.paragraphs.indexOf(paraObj);
  this.paragraphs.splice(index,1);
}

private getCurrentDateInUTC(){
  let date = "";
  let dateObj = new Date();
  date = String(dateObj.getUTCDate)+String(Number(dateObj.getUTCMonth)+1)+String(dateObj.getUTCFullYear);
  return date;

}

private createPost(){
  this.postObj.paragraphs = this.paragraphs;
  this.standardBlogService.addPost(this.postObj).subscribe(result => {
    console.log('result is ', result);
});

}

}
