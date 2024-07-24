import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogComponent } from '../blog/blog.component';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, BlogComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  blogPost: BlogPost | undefined;
  formattedContent: SafeHtml | undefined;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.blogPost = JSON.parse(params['post']);
      if (this.blogPost) {
        this.formattedContent = this.sanitizer.bypassSecurityTrustHtml(this.insertAds(this.blogPost.content));
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  insertAds(content: string): string {
    const paragraphs = content.split('</p>');
    const adHtml = '<div class="ad-placeholder"><img class="ad-img" src="https://theonlineadvertisingguide.com/wp-content/uploads/MPU-Mobile-min.png" alt="Ad" style="width: 280px; height: auto;"></div>';
    let formattedContent = '';

    paragraphs.forEach((paragraph, index) => {
      if (index % 8 === 1) {
        formattedContent += adHtml;
      }
      formattedContent += paragraph + '</p>';
    });

    return formattedContent;
  }
}