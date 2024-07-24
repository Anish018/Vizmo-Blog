import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

export const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogPostComponent } // Route for blog post
];
