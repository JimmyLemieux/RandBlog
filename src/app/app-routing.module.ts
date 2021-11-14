import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { AboutComponent } from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {AnimeComponent} from './anime/anime.component';

const routes: Routes = [
  {path: "", component: BlogEntryComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", component: ContactComponent},
  {path: "anime", component: AnimeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
