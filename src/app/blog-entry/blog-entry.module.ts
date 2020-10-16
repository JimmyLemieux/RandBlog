import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { BlogEntryComponent } from './blog-entry.component';
import { AppRoutingModule } from '../app-routing.module';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [
    BlogEntryComponent,
    PostComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    PostModule
  ],

  exports: [],

  providers: [],
  bootstrap: [BlogEntryComponent]
})
export class BlogEntryModule { }