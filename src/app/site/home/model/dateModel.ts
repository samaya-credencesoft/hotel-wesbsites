import { Room } from 'src/app/room/room';
import { Booking } from '../../../booking/booking';
import { Payment } from './../../../payment/payment';


export class DateModel {

  checkIn: string;
  checkOut: string;
  guest: number;
  noOfRooms: number;
  room: Room;
  booking: Booking;
  payment: Payment;

  constructor()
      { }
}
