
import { Booking } from "./booking";
import { Payment } from "./payment";
import { Room } from "./room";



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
