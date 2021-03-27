import { Injectable } from "@angular/core";
import { Booking } from "./model/booking";
import { Property } from "./model/property";

const PROPERTY = 'Property';
const PROPERTY_NAME = 'PropertyName';
const BOOKINGDATA = "booking";
const BUSINESSUSER = "business";


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

  // Booking
  public saveBookingData(booking: Booking) {
    window.sessionStorage.removeItem(BOOKINGDATA);
    if (booking !== null || booking !== undefined) {
      window.sessionStorage.setItem(BOOKINGDATA, JSON.stringify(booking));
    } else {
      window.sessionStorage.setItem(BOOKINGDATA, null);
    }
  }

  public getBookingData(): Booking {
    return JSON.parse(sessionStorage.getItem(BOOKINGDATA));
  }

  clearHotelBooking() {
    window.sessionStorage.removeItem(BOOKINGDATA);
  }

}
