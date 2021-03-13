import { Payment } from "src/app/payment/payment";
import { Room } from "src/app/room/room";
import { Booking } from "./booking";



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
