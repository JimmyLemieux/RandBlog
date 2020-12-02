import { Component, OnInit } from '@angular/core';
import {AboutService} from './about.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private aboutService: AboutService) { }

  aboutIntro: string;

  ngOnInit() {
    this.aboutService.getIntroduction().subscribe(result => {
      this.aboutIntro = result.about;
    })
  }
}
