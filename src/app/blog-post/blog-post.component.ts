import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.blogPost = JSON.parse(params['post']);
      if (this.blogPost) {
        this.formattedContent = this.sanitizer.bypassSecurityTrustHtml(this.insertAds(this.blogPost.content));
        this.resizeImages();
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  insertAds(content: string): string {
    const paragraphs = content.split('</p>');
    const adHtml = '<div class="ad-placeholder"><img src="https://theonlineadvertisingguide.com/wp-content/uploads/MPU-Mobile-min.png" alt="Ad" style="width: 280px; height: auto;"></div>';
    let formattedContent = '';

    paragraphs.forEach((paragraph, index) => {
      if (index % 8 === 1) {
        formattedContent += adHtml;
      }
      formattedContent += paragraph + '</p>';
    });

    return formattedContent;
  }

  resizeImages(): void {
    setTimeout(() => {
      const images = this.el.nativeElement.querySelectorAll('.text img');
      const maxWidth = window.innerWidth <= 500 ? '280px' : '360px';

      images.forEach((img: HTMLImageElement) => {
        this.renderer.setStyle(img, 'max-width', maxWidth);
        this.renderer.setStyle(img, 'height', 'auto');
        this.renderer.setStyle(img, 'display', 'block');
        this.renderer.setStyle(img, 'margin', '20px auto');
      });
    }, 0);
  }
}