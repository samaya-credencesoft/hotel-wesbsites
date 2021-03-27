import { APP_ID, Injectable } from '@angular/core';
import { Payment } from './site/home/model/payment';
import { Host } from './host';
import { Booking } from './site/home/model/booking';
import { Property } from './site/home/model/property';
import { Room } from './room/room';
import { Observable } from 'rxjs';
import { GuestReview } from './guest/guest.component';
import { environment } from 'src/environments/environment';
import { Customer } from './site/home/model/customer';
import { MessageDto } from './site/home/model/MessageDto';
import { Msg } from './site/home/model/msg';
import { BookingDetails } from './site/home/model/bookingdetails';
import { HttpClient } from '@angular/common/http';

export const API_URL = environment.apiUrl + '/api/website';
export const API_URL2 = environment.apiUrl;


export const SMS_NUMBER = '+1 956 903 2629';
//const API_URL2 = 'https://localhost:8080';
//const API_URL = 'http://localhost:8080/api/website';
// production
export const PROPERTY_ID = environment.propertyId
  ;
// development
//export const PROPERTY_ID = 8;

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  processPayPalPayment(payment: Payment) {
    return this.http.post(API_URL2 + '/api/payment/create', payment, { observe: 'response' });
  }
  getAllBookingsByHost(host: Host) {
    return this.http.post<Booking[]>(API_URL2 + '/api/booking/findAll', host, { observe: 'response' });
  }
  getBookingDetailsByIdAndEmail(booking: Booking) {
    return this.http.get<BookingDetails>(API_URL + '/findBookingByIdAndEmail?BookingReferenceNumber='
      + booking.id + '&BookingEmail=' + booking.email, { observe: 'response' });
  }
  authorisationToken(message: MessageDto) {
    return this.http.post<MessageDto[]>(API_URL + '/authorisationToken', message, { observe: 'response' });
  }
  send(message: MessageDto) {
    return this.http.post<MessageDto[]>(API_URL2 + '/api/message/send', message, { observe: 'response' });
  }
  verifyAuthorisationToken(message: MessageDto) {

    return this.http.post<MessageDto[]>(API_URL2 + '/api/message/verifyAuthorisationToken', message, { observe: 'response' });
  }
  getCustomerDetailsByEmail(email: string) {
    return this.http.get<Customer>(API_URL + '/email/' + email + '/', { observe: 'response' });
  }
  getCustomerDetailsByMobile(mobile: string) {
    return this.http.get<Customer>(API_URL + '/mobile/' + mobile, { observe: 'response' });
  }
  getPropertyDetailsByPropertyId(propertyId: number) {
    return this.http.get<Property>(API_URL + '/findByPropertyId/' + propertyId, { observe: 'response' });
  }
  getRoomDetailsByPropertyId(propertyId: number) {
    return this.http.get<Room[]>(API_URL + '/findAllRoomsByPropertyId/' + propertyId, { observe: 'response' });
  }
  getRoomDetailsByPropertyIdAndDate(propertyId: number, fromDate: string, toDate: string) {
    return this.http.get<Room[]>(API_URL + '/getAllRoomsByDate?PropertyId=' + propertyId + '&FromDate=' + fromDate + '&ToDate=' + toDate, { observe: 'response' });
  }

  checkAvailability(booking: Booking) {
    return this.http.post<Booking>(API_URL + '/checkAvailability', booking, { observe: 'response' });
  }
  checkAvailabilityByID(booking: Booking) {
    return this.http.get<any>(API_URL + '/checkAvailability/' + PROPERTY_ID + '?fromDate=' + booking.fromDate + '&toDate=' + booking.toDate + '&noOfRooms=' + booking.noOfRooms + '&noOfPersons=' + booking.noOfPersons + '', { observe: 'response' });
  }
  processPayment(paymentDetails: Payment) {
    return this.http.post<Payment>(API_URL + '/processPayment', paymentDetails, { observe: 'response' });
  }
  createBooking(booking: Booking) {
    return this.http.post<Booking>(API_URL + '/booking', booking, { observe: 'response' });
  }
  sendTextMessage(message: Msg) {
    return this.http.post<Msg>(API_URL + '/message/send', message, { observe: 'response' });
  }
  savePayment(paymentDetails: Payment) {
    return this.http.post<Payment>(API_URL + '/savePayment', paymentDetails, { observe: 'response' });
  }
  getGoogleReviews() {
    return this.http.get<GuestReview[]>(API_URL + '/getGoogleReviews?PropertyId=' + PROPERTY_ID, { observe: 'response' });
  }

  getWeather(city) {
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?id=' + city + '&appid=e7cd0a5bb0b7f7da10995c75d8e6a6d5&units=metric', { observe: 'response' });
  }
}
