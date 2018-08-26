import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { StandardBlogComponent } from './standardBlog/standardBlog.component';
import { CreateStandardBlogComponent } from './standardBlog/createStandardBlog.component';

export const AppRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'add', component: AddPostComponent },
	{ path: 'stdBlog', component: StandardBlogComponent },
	{ path: 'stdBlog/:_id', component: StandardBlogComponent },
	{ path: 'createStdBlog/:_userId/:_password', component: CreateStandardBlogComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);