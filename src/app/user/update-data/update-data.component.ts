import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BSON } from 'realm-web';
import { updateDataDAO, UserDAO } from '../socialUser.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private userService: UserService, private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateDataComponent>) { }

  updateForm!: FormGroup;
  userData: updateDataDAO = new updateDataDAO();

  app_id:string = "housemanager-zblhe";

  ngOnInit(): void {

    this.updateForm = this.fb.group({
      email: [''],
      phone: [''],
      firstName: [''],
      lastName: [''],
    });

    let email = localStorage.getItem("userEmail") as string;
    this.userService.getUser(email).then(data => {
      console.log(data);
      this.userData.email = data.email;
      this.userData.lastName = data.lastName;
      this.userData.firstName = data.firstName;
      this.userData.phone = data.phone;

      this.updateForm.patchValue(this.userData);
      this.updateForm.get("email")?.disable();
    });
  }

  submit(){
    if(this.updateForm.valid){
      let id = localStorage.getItem("userID") as string;
      let newId = new BSON.ObjectID(id);
      let app = new Realm.App({id: this.app_id});
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("users");
      let res = collection?.findOneAndUpdate({_id: newId}, {$set: {
      firstName: this.updateForm.get("firstName")?.value,
      lastName: this.updateForm.get("lastName")?.value,
      phone: this.updateForm.get("phone")?.value}});
      res?.then(data => {
        console.log(data);
        this.dialogRef.close();
        this.snackBar.open("Adatok módosítása sikeres!", "OK", {panelClass: 'success-snackbar'});
      })
    }else{
      console.log("invalid");
    }

  }

}
