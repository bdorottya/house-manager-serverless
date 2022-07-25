import { ObjectId } from "mongodb";

export interface SocialUser {
    id: string;
    email: string;
    avatar: string;
    phone: string;
    firstName: string;
    lastName: string;
    _registrationDate: Date;
    _uploadedHomes: string[];
    _savedHomes: string[];
    _ratingsWrote: string[];
}

export class UserDAO{
  email: string;
  firstName: string;
  lastName: string;
  date: Date;
  phone!:number;


  constructor(email: string, firstName: string, lastName:string, date: Date){
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
  }
}

export class updateUserDao{
  phone?:string;
  avatar?:string;


}
