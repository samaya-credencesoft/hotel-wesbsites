import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public token :TokenStorage) { }

  ngOnInit() {
  }

}
