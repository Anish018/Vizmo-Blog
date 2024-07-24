import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  author: string;
  date: string; 
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, QuillModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogForm: FormGroup;
  blogPosts: BlogPost[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  submitBlog() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }
    const newBlog: BlogPost = {
      ...this.blogForm.value,
      date: new Date().toLocaleDateString() // Add current date
    };
    this.blogPosts.push(newBlog);
    this.saveBlogPosts();
    this.blogForm.reset({ title: '', content: '', image: '', author: '' });
    this.scrollToBottom();
  }

  selectPost(post: BlogPost) {
    this.router.navigate(['/blog', post.title], { queryParams: { post: JSON.stringify(post) } }).then(() => {
      this.scrollToTop();
    });
  }

  saveBlogPosts() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('blogPosts', JSON.stringify(this.blogPosts));
    }
  }

  loadBlogPosts() {
    if (typeof localStorage !== 'undefined') {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        this.blogPosts = JSON.parse(savedPosts);
      }
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const element = document.getElementById('blogPosts');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  scrollToTop() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }
}
