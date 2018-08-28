import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { StandardBlogComponent } from './standardBlog/standardBlog.component';
import { CreateStandardBlogComponent } from './standardBlog/createStandardBlog.component';
import { ModifyStandardBlogComponent } from './standardBlog/modifyStandardBlog.component';

export const AppRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'add', component: AddPostComponent },
	{ path: 'stdBlog', component: StandardBlogComponent },
	{ path: 'stdBlog/:_id', component: StandardBlogComponent },
	{ path: 'createpost', component: CreateStandardBlogComponent },
	{ path: 'modifypost', component: ModifyStandardBlogComponent },
	{ path: 'createpost/:_id', component: CreateStandardBlogComponent },
	{ path: 'login', component: LoginComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);