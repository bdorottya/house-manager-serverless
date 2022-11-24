import { ObjectId } from "mongodb";

export class User{
  _id!: ObjectId;
  email!: string;
  firstName!: string;
  lastName!: string;
  registrationDate!: Date;
  role!: string;
  field!:string;
  city!:string;
  phone!:string;
  avatar!:string;
  welcomeText!:string;
  prices!:any[];
  _uploadedHomes!:ObjectId[];
  _savedHomes!:ObjectId[];
  _savedExperts!:ObjectId[];
}

export class UserDAO{
  _id!: ObjectId;
  email!: string;
  firstName!: string;
  lastName!: string;
  date!: Date;
  phone?:string;
  avatar?:string;
}

export class updateDataDAO{
  email?:string;
  lastName?:string;
  firstName?:string;
  phone?:string;
}
