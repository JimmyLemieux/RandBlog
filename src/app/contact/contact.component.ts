import { Component, OnInit } from '@angular/core';
import {ContactService} from './contact.service'; 


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email: string;
  name: string;
  text: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  sendEmail() : void {
    console.log(this.email);
    console.log(this.name);
    console.log(this.text);
    this.contactService.sendEmail({email: this.email, name: this.name, text: this.text}).subscribe(result => {
      console.log(result);
    });
  }
}
