import { Host, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Room } from './shared/models/room';
import { GuestReview } from './shared/models/guestReview';
import { Booking } from './model/booking';
import { BookingDetails } from './model/bookingdetails';
import { Msg } from './model/msg';
import { Payment } from './model/payment';
import { Property } from './model/property';
import { Customer } from './model/customer';
import { MessageDto } from './model/MessageDto';


const API_URL = environment.apiUrl + '/api/website';
const API_URL2 = environment.apiUrl;
export const SMS_NUMBER = '+1 956 903 2629';
//const API_URL2 = 'https://localhost:8080';
//const API_URL = 'http://localhost:8080/api/website';
// production
export const PROPERTY_ID = environment.propertyId
;
@Injectable({
  providedIn: 'root'
})
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

}
