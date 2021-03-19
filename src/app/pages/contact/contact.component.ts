import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/shared/models/property';
import { TokenStorage } from 'src/app/token.storage';

import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';


export interface Email {

  fromEmail: string;
  toEmail: string;
  subject: string;
  message: string;

}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() property: Property;
  loadingError = false;


  lat = -36.79648;
  lng = 174.646926;


  error = null;
  success: any = false;
  subjects: string;
  constructor(
    private router: Router,
 public token: TokenStorage,
 public apiService: ApiService,
 public http: HttpClient
  ) {
    this.property = new Property();
    if (this.token.getProperty() !== null) {
      this.property = this.token.getProperty();
    } else {
      this.getProperty();
    }
  }
  subject: FormControl = new FormControl();
  // name: FormControl = new FormControl();
  fromEmail: FormControl = new FormControl();
  toEmail: FormControl = new FormControl();
  message: FormControl = new FormControl();
  serviceName: string ;
  subscriptions: string [];
  name: string;
  email: Email ;
  emailSuccess: Boolean;
  form = new FormGroup({
    subject: new FormControl(),
    name: new FormControl(),
    fromEmail: new FormControl(),
    message:  new FormControl()
  });

  ngOnInit(): void {
    this.email = {
      fromEmail: '',
      toEmail: '',
      subject: '',
      message: ''
    };
  }
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      this.property = response.body;
      this.token.saveProperty(this.property);
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    );
  }
  submitForm(form: NgForm) {
    console.log(JSON.stringify(this.subscriptions));
    // const TO_EMAIL = 'samaya.muduli@credencesoft.co.nz';
    const TO_EMAIL = 'abir.sayeed@gmail.com';
    // const TO_EMAIL = this.property.email;

    const API_URL = environment.apiUrl;
    // const API_URL = 'http://localhost:8080';

    this.email.fromEmail = form.value.email;
    this.email.toEmail = TO_EMAIL;
    this.name = form.value.name;
    // this.email.subject = form.value.subject;
    this.serviceName = '' + this.subscriptions;
    // tslint:disable-next-line: max-line-length
    this.email.message = 'Name: ' + this.name + '\nEmail: ' + form.value.email + ' \nSubject: ' + this.subjects + ' \nMessage: ' + form.value.message + '. \n*****this message is sent from ' + this.property.name + ' Website.******';

    console.log(this.subscriptions + ' ' + this.name);
    this.email.subject = '' + this.subjects ;
    console.log('form data ' + JSON.stringify(this.email));
    //  this.success = true;
    this.http.post<Email>(API_URL + '/api/website/sendEmailFromWebSite', this.email ).
   subscribe(response => {
    this.success = response;
    console.log(response);
   });
  }




}


