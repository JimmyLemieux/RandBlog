import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { AboutComponent } from './about/about.component';
import { FeatsComponent } from './feats/feats.component';
import { PostComponent } from './blog-entry/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogEntryComponent,
    AboutComponent,
    FeatsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
