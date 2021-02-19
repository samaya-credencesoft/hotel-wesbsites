import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public token :TokenStorage) { }

  ngOnInit() {
  }

}
