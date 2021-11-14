import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './blog-entry/post/post.component';
import { ContactComponent } from './contact/contact.component'; 
import { FilterPipe } from './filter.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordsComponent } from './words/words.component';
import { AnimeComponent } from './anime/anime.component';



@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    BlogEntryComponent,
    AboutComponent,
    PostComponent,
    ContactComponent,
    WordsComponent,
    AnimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
