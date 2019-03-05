import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property/property';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() property: Property;
  loadingError = false;

  ngOnInit() {}

  constructor() {
    console.log(this.property);
  }
}
