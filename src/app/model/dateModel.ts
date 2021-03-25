
import { Booking } from './booking';
import { Payment } from './payment';
import { Room } from './room';



export class DateModel {

  checkIn: string;
  checkOut: string;

  room: Room;
  booking: Booking;
  payment: Payment;

  constructor()
      { }
}
