import { ObjectId } from "mongodb";

export interface SocialUser {
    id: string;
    email: string;
    avatar: string;
    phone: string;
    firstName: string;
    lastName: string;
    field: string;
    _registrationDate: Date;
    _uploadedHomes: string[];
    _savedHomes: string[];
    _ratingsWrote: string[];
}

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
  _currentRate!:number;
  _ratings!:string[];

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

export class updateUserDao{
  phone?:string;
  avatar?:string;
}
