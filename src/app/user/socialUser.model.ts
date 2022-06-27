import { ObjectId } from "mongodb";

export interface SocialUser {
    id: string;
    email: string;
    avatar: string;
    phone: string;
    firstName: string;
    lastName: string;
    address:string;
    _registrationDate: Date;
    _lastLoginDate: Date;
    _uploadedHomes: string[];
    _savedHomes: string[];
    _ratingsWrote: string[];
}

export class UserDAO{
  email: string;
  firstName: string;
  lastName: string;


  constructor(email: string, firstName: string, lastName:string){
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class updateUserDao{
  phone:string;
  avatar:string;

  constructor(phone: string, avatar:string) {
    this.phone = phone;
    this.avatar = avatar;
  }
}
