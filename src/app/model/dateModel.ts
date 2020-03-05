import { Room } from './room';
import { Booking } from './booking';
import { Payment } from './payment';



export class DateModel {

  checkedin: string;
  checkout: string;

  room: Room;
  booking: Booking;
  payment: Payment;

  constructor()
      { }
}
