import { Injectable } from '@angular/core';

const PROPERTY_NAME = 'PropertyName';


@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(PROPERTY_NAME);
    window.sessionStorage.clear();
  }

  public savePropertyName(name: string) {
    window.sessionStorage.removeItem(PROPERTY_NAME);
    window.sessionStorage.setItem(PROPERTY_NAME, name);
  }

  public getPropertyName(): string {
    return sessionStorage.getItem(PROPERTY_NAME);
  }

}
