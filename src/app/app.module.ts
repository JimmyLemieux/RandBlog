import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './blog-entry/post/post.component';
import { ContactComponent } from './contact/contact.component'; 

@NgModule({
  declarations: [
    AppComponent,
    BlogEntryComponent,
    AboutComponent,
    PostComponent,
    ContactComponent
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
