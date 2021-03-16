export class Room {

    id: number;
    referenceNumber: string;
    name: string;
    description: string;
    propertyId: number;
    roomOnlyPrice: number;
    totalPriceServices: number;
    totalPriceAmenities: number;
    totalPriceRoom: number;
    pricePerNight: number;
    pricePerWeek: number;
    priceFortNight: number;
    priceMonthly: number;
    minimumOccupancy: number;
    maximumOccupancy: number;
    extraChargePerPerson: number;
    noOfRooms: number;
    email: string;
    mobile: string;
    fromDate: string;
    toDate: string;
    roomType: string;
    roomPrice: string;
    airportShuttlePrice: string;
    businessEmail: string;
    businessName: string;
    minimumLengthOfStay: number;
    maximumLengthOfStay: number;
    shared: boolean;
    imageList: [
      {
        id: number;
        name: string;
        url: string;
        description: string;
        mainImage: boolean;
      }
    ];
    roomDetails: [
      {
        roomId: number;
        roomNumber: number;
        available: boolean;
        guestName: string;
        bookingId: number;
        description: string;
        roomStatus: string;
        floorNumber: string;
        floorName: string;
        noOfBed: number;
        bedType: string;
        checkinTime: string;
        checkoutTime: string;
        totalAmount: number;
        totalServiceAmount: number;
        totalExpenseAmount: number;
        totalPaymentAmount: number;
        discountAmount: number;
        outstandingAmount: number;
        customerId: number;
        date: string;
        bookingStatus: string;
        bedDescription: string;
      }
    ];
    constructor()
        { }
}
