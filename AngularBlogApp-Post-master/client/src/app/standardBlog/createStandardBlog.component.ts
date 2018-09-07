import { Component,OnInit,AfterViewInit} from '@angular/core';
import { StandardBlogService } from './standardBlog.service';
import { Post } from '../models/post.model';
import { Router,ActivatedRoute} from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

declare var jQuery:any;

@Component({
  selector: 'create-standard-blog',
  templateUrl: './createStandardBlog.component.html',
  styleUrls: ['./createStandardBlog.component.css'],
  providers: [ StandardBlogService ]
})
export class CreateStandardBlogComponent implements OnInit {
    public _allowAccess:boolean = false;
    private postObj:any;
    private paragraphs = [];
    private routerParams:any;
    private _postId:string;
    private modifyMode:boolean = false;
    private fileUploadPath_Dev:string = "./assets/images/";
    private fileUploadPath_Prod:string = "./assets/images/";
    private fileUploadPath:string = "";

    /*Dev Asset Location*/
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload'});

    /*Prod Asset Location*/
    //public uploader:FileUploader = new FileUploader({url:'http://139.59.6.170:3000/upload'});
    
    

    constructor(private standardBlogService: StandardBlogService, private route: ActivatedRoute, private router: Router){
        // if(!localStorage.getItem('loggedInUser')){
        //     alert("Access is denied");
        //     this._allowAccess = false;
        //     this.router.navigate(['/']);
        // }
        // else {
        //   this._allowAccess = true;
        //   this.route.params.subscribe( params => this.routerParams = params);
        // }

        this._allowAccess = true;
        this.route.params.subscribe( params => this.routerParams = params);
        this.fileUploadPath = this.fileUploadPath_Prod;
    }

  ngOnInit(){
      this._postId = this.routerParams._id;
      if(!this._postId){
        this.initStdPostObj();
      }
      else{
          this.modifyMode = true;
          this.standardBlogService.getPost(this._postId).subscribe(result => {
            this.postObj = result['data'];
            if(this.postObj.paragraphs){
              this.paragraphs = this.postObj.paragraphs;
            }else this.paragraphs = [];
          });
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

private initStdPostObj(){
    this.postObj = {
      "title": "",
      "description": "",
      "date": "26/08/2018",
      "asscField": "",
      "leadImage": "",
      "leadText": "",
      "leadTextCont": "",
      "publishPost": "",
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
    alert("Post created successfully");
    this.router.navigate(['/']);
  });
}


private savePost(){
  this.standardBlogService.updatePost(this.postObj).subscribe(result => {
    //alert(result.toString());
    //this.router.navigate(['/']);
    alert("Post saved successfully");
  });
}

private logout(){
  //localStorage.removeItem('loggedInUser');
  this.router.navigate(['/']);
}

private updateFilePathInObj(){
  //Lead Image for Blog
  this.postObj.leadImage =  this.fileUploadPath+this.uploader.queue[0].file.name;
  //Paragraph Images
  let i = 1;
  for (let paragraph of this.paragraphs) {
    paragraph.image =  this.fileUploadPath+this.uploader.queue[i].file.name;
    i++;
  } 
}

  createPostandUploadFiles(){
    this.updateFilePathInObj();
    this.createPost();
    this.uploader.uploadAll();
  }

  modifyPostandUploadFiles(){
    if (this.uploader.queue.length > 0){
      this.updateFilePathInObj();
    }
    this.savePost();
    if (this.uploader.queue.length > 0){
      this.uploader.uploadAll();
    }
  }

}
