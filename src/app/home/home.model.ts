import { ObjectId } from "mongodb";

export interface Home{
  city: string;
  city2: string;
  street:string;
  buildingType: string;
  levelsInBuilding:number;
  price: number;
  size: number;
  condition: string;
  heating:string;
  level:string;
  bedroom:number;
  bathroom:number;
  parking:string;
  elevator:boolean;
  garden:boolean;
  attic:boolean;
  balcony: boolean;
  airConditioner:boolean;
  pet:boolean;
  smoke:boolean;
  type:string;
  images:string[];
  _saved:number;
  _viewed:number;
  uploader:string;
  uploadDate:Date;
}

export class HomeDAO {
  _id?: ObjectId;
  city!: string;
  city2?: string;
  street!:string;
  levelsInBuilding?:number;
  buildingType?:string;
  price!:number;
  size!:number;
  condition!:string;
  heating!:string;
  level?:string;
  parking!:string;
  bedroom?:number;
  bathroom?:number;
  elevator!:boolean;
  attic!:boolean;
  garden!:boolean;
  balcony!:boolean;
  airConditioner!:boolean;
  pet!:boolean;
  smoke!:boolean;
  type!:string;
  uploader?:string;
}
