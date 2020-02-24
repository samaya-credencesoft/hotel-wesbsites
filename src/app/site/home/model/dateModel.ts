import { Room } from 'src/app/room/room';
import { Booking } from '../../../booking/booking';
import { Payment } from './../../../payment/payment';


export class DateModel {

  checkedin: string;
  checkout: string;

  room : Room;
  booking : Booking;
  payment : Payment;

  constructor()
      { }
}
