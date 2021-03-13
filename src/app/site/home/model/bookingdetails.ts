import { Payment } from "../../../payment/payment";
import { Booking } from "./booking";

export class BookingDetails {
    bookingDetails: Booking;
    paymentDetails: Payment[];
    constructor() {
    }
}
