import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { StandardBlogComponent } from './standardBlog/standardBlog.component';
import { CreateStandardBlogComponent } from './standardBlog/createStandardBlog.component';
import { CommonService } from './service/common.service';
import { FileSelectDirective} from 'ng2-file-upload';


@NgModule({
  declarations: [
  	RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent,
    StandardBlogComponent,
    CreateStandardBlogComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [CommonService],
  bootstrap: [RootComponent]
})
export class AppModule { }
