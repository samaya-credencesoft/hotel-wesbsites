import { Injectable } from "@angular/core";
import { Property } from "./property/property";
import { Booking } from "./site/home/model/booking";
import { BusinessUser } from "./site/home/model/user";

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

  public saveBusinessUser(businessUser: BusinessUser) {
    window.sessionStorage.removeItem(BUSINESSUSER);
    window.sessionStorage.setItem(BUSINESSUSER, JSON.stringify(businessUser));
  }

  public getBusinessUser(): BusinessUser {
    return JSON.parse(sessionStorage.getItem(BUSINESSUSER));
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
