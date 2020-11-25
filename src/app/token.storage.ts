import { Property } from './property/property';
import { Injectable } from '@angular/core';

const PROPERTY = 'Property';
const PROPERTY_NAME = 'PropertyName';



@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(PROPERTY_NAME);
    window.sessionStorage.clear();
  }

  public saveProperty(property: Property) {
    window.sessionStorage.removeItem(PROPERTY);
    window.sessionStorage.setItem(PROPERTY, JSON.stringify(property));
  }

  public getProperty(): Property {
    return JSON.parse(sessionStorage.getItem(PROPERTY));
  }
  public savePropertyName(name: string) {
    window.sessionStorage.removeItem(PROPERTY_NAME);
    window.sessionStorage.setItem(PROPERTY_NAME, name);
  }

  public getPropertyName(): string {
    return sessionStorage.getItem(PROPERTY_NAME);
  }

}
