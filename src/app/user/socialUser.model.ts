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
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  date: Date;
  phone:string;
  avatar:string


  constructor(id: ObjectId,email: string, firstName: string, lastName:string, date: Date, avatar:string, phone:string){
    this._id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.phone = phone;
    this.avatar = avatar;
  }
}

export class updateUserDao{
  phone?:string;
  avatar?:string;


}
