import { ObjectId } from "mongodb";


export class Rate{
  star!: number;
  review!:string;
  userId!:ObjectId;
  expertId!: ObjectId;
}
