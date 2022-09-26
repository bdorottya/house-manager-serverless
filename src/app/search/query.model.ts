export class HomeSearchQuery{
  city!: string;
  type!:string;
  city2?: string;
  buildingType?: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  conditions?:string;
  heatingType?:string;
  minLevel?:number;
  maxLevel?:number;
  parking?:string;
  minBedrooms?:number;
  minBathrooms?:number;
  elevator?:boolean;
  attic?:boolean;
  garden?:boolean;
  balcony?:boolean;
  airC?:boolean;
  pet?:boolean;
  smoke?:boolean;
  hasImage?:boolean;
}
