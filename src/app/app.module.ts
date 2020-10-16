import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { NewsComponent } from './news/news.component';
import { FeatsComponent } from './feats/feats.component';
import { PostComponent } from './blog-entry/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogEntryComponent,
    NewsComponent,
    FeatsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
