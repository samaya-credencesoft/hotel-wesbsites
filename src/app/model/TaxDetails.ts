import { TaxSlabs } from './TaxSlabs';

export class TaxDetails {


  name : string;
  percentage : number;
  country : string;
  state : string;
  taxableAmount  : number;
  taxAmount:string;

  taxSlabsList : TaxSlabs[];


  constructor() {
   }
}
