
import { Room } from "../shared/models/room";
import { Booking } from "./booking";
import { Payment } from "./payment";



export class DateModel {

  checkIn: string;
  checkOut: string;
  guest: number;
  noOfChildren: number;
  noOfRooms: number;
  room: Room;
  booking: Booking;
  payment: Payment;

  constructor()
      { }
}
