import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { FeatsComponent } from './feats/feats.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: "", component: BlogEntryComponent},
  {path: "about", component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
