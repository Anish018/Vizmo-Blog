import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

export const routes: Routes = [{ path: '', component: BlogComponent },
    {path: 'blog', component: BlogPostComponent}
];
