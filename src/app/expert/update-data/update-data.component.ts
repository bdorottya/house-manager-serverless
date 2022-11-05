import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/user/socialUser.model';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UpdateDataComponent>, private snackBar: MatSnackBar) { }

  dataForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    city: new FormControl(''),
    welcomeText: new FormControl('')
  })

  expert!:User;

  app_id:string = "housemanager-zblhe";

  ngOnInit(): void {
    this.dataForm.get("email")?.setValue(this.expert.email);
    this.dataForm.get("phone")?.setValue(this.expert.phone);
    this.dataForm.get("firstName")?.setValue(this.expert.firstName);
    this.dataForm.get("lastName")?.setValue(this.expert.lastName);
    this.dataForm.get("city")?.setValue(this.expert.city);
    this.dataForm.get("welcomeText")?.setValue(this.expert.welcomeText);

    this.dataForm.get("email")?.disable();
  }

  submit(){
    if(this.dataForm.valid){
      let query = this.dataForm.value;
      let app = new Realm.App({id: this.app_id});
      let mongo = app.currentUser?.mongoClient("mongodb-atlas");
      let collection = mongo?.db("home-maker").collection("users");
      let res = collection?.findOneAndUpdate({_id: this.expert._id}, {$set: {
        phone: this.dataForm.get("phone")?.value,
        firstName: this.dataForm.get("firstName")?.value,
        lastName: this.dataForm.get("lastName")?.value,
        city: this.dataForm.get("city")?.value,
        welcomeText: this.dataForm.get("welcomeText")?.value,
      }}).then(data => {
        console.log(data);
        this.snackBar.open("Sikeres adatmódpsítás", "OK", {panelClass: 'successful-snackbar'});
        this.close();
      })
    }
  }

  close(){
    this.dialogRef.close();
  }

}
