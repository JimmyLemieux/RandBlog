import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { FeatsComponent } from './feats/feats.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {path: "", component: BlogEntryComponent},
  {path: "news", component: NewsComponent},
  {path: "feats", component: FeatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
