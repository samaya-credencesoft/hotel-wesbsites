import { Room } from './room';
import { Booking } from './booking';
import { Payment } from './payment';


export class DateModel {

  checkIn: string;
  checkOut: string;
  guest: number;
  room: Room;
  booking: Booking;
  payment: Payment;

  constructor()
      { }
}
