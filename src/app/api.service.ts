import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Payment } from './payment/payment';
import { Host } from './host';
import { Booking } from './booking/booking';
import { Property } from './property/property';
import { Room } from './room/room';
import { Msg } from './booking/msg';
import { Observable } from 'rxjs';
import { BookingDetails } from './bookingdetail/bookingdetails';
import { GuestReview } from './guest/guest.component';

 //const API_URL = 'http://app.bookonepms.com:9080/api-bookone/api/website';
// const API_URL2 = 'http://app.bookonepms.com:9080/api-bookone';
 export const SMS_NUMBER = '+1 956 903 2629';
// const API_URL2 = 'https://booking-api-csoft.appspot.com';
 const API_URL = 'https://booking-api-csoft.appspot.com/api/website';
// production
//export const PROPERTY_ID = 92;
// development
export const PROPERTY_ID = 8;

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  processPayPalPayment(payment: Payment) {
    return this.http.post(API_URL + '/api/payment/create', payment, { observe: 'response' });
  }
  getAllBookingsByHost(host: Host) {
    return this.http.post<Booking[]>(API_URL + '/api/booking/findAll', host, { observe: 'response' });
  }
  getBookingDetailsByIdAndEmail(booking: Booking) {
    return this.http.get<BookingDetails>(API_URL + '/findBookingByIdAndEmail?BookingReferenceNumber='
    + booking.id + '&BookingEmail=' + booking.email,  { observe: 'response' });

  }
  getPropertyDetailsByPropertyId(propertyId: number) {
    return this.http.get<Property>(API_URL + '/findByPropertyId/' + propertyId,  { observe: 'response' });
  }
  getRoomDetailsByPropertyId(propertyId: number) {
    return this.http.get < Room []>(API_URL + '/findAllRoomsByPropertyId/' + propertyId,  { observe: 'response' });
  }
  getRoomDetailsByPropertyIdAndDate(propertyId: number, fromDate: string, toDate: string) {
    return this.http.get < Room []>(API_URL + '/getAllRoomsByDate?PropertyId=' + propertyId + '&FromDate=' + fromDate + '&ToDate=' + toDate,  { observe: 'response' });
  }

  checkAvailability(booking: Booking) {
    return this.http.post<Booking> (API_URL + '/checkAvailability', booking ,  { observe: 'response' });
  }
  processPayment(paymentDetails: Payment) {
    return this.http.post<Payment>(API_URL + '/processPayment', paymentDetails, { observe: 'response' });
}
  createBooking(booking: Booking) {
    return this.http.post<Booking>(API_URL + '/booking', booking, { observe: 'response' });
  }
  sendTextMessage(message: Msg ) {
    return this.http.post<Msg>(API_URL + '/message/send', message, { observe: 'response' });
  }
  savePayment(paymentDetails: Payment) {
    return this.http.post<Payment>(API_URL + '/savePayment', paymentDetails, { observe: 'response' });
}
  getGoogleReviews() {
  return this.http.get<GuestReview[]>(API_URL + '/getGoogleReviews?PropertyId=' + PROPERTY_ID ,  { observe: 'response' });
}
}
