import { ClosedDays } from './closedDays';
import { OpenDays } from './openDays';
import { BusinessServiceTypes } from './businessServiceTypes';

export class BusinessServiceDtoList {
  id: number;
  closedDays: ClosedDays[];
  openDays: OpenDays[];
  name: string;

  businessLocationName: string;
  customerLocationName: string;
  canChangeBusinessAddress: boolean;
  provideBusinessAndCustomerAddress: boolean;

  businessTermLocation: string;
  businessTermResource: string;

  businessProductName: string;
  businessServiceName: string;
  bookingButtonLabelText : string;

  maxLeadTime: number;
  minLeadTime: number;
  stdPrepTime: number;
  
  description: string;
  policy: string;

  propertyId: number;
  businessServiceTypes: BusinessServiceTypes[];
  serviceCloseList: [
    {
      day: string;
    }
  ];
  serviceOpenList: [
    {
      breakFromTime: string;
      breakToTime: string;
      closingTime: string;
      day: string;
      openingTime: string;
    }
  ];
  constructor() {}
}
