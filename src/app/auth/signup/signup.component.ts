import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BSON } from 'realm-web';
import { AuthService } from '../auth.service';
import { Constants } from 'src/app/environment/constants';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from 'src/app/navigation/spinner/spinner.component';
import { User, UserDAO } from 'src/app/user/socialUser.model';
import * as Realm from 'realm-web';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required)
  });

  expertForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    passwordAgain: new FormControl('', Validators.required),
    field: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  })

  fields:string[]=[];

  app_id:string = "housemanager-zblhe";

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fields = Constants.expertFields;
  }

  async submitSignup(){
    if(this.signupForm.valid){

        let email = this.signupForm.get("email")?.value;
        let password = this.signupForm.get("password")?.value;
        let lastName = this.signupForm.get("lastName")?.value;
        let firstName = this.signupForm.get("firstName")?.value;
        let date = new Date()
        let res = await this.authService.signup(email, password);
        let app = new Realm.App({id: this.app_id});
        const creds = Realm.Credentials.emailPassword(email, password);
        this.dialog.open(SpinnerComponent);
        try{
          let user = await app.logIn(creds);
          console.assert(user.id === app.currentUser?.id);
          console.log(app.currentUser?.id);
          this.authService.loggedInUser = true;
          localStorage.setItem("userID", app.currentUser?.id as string);
          localStorage.setItem("userEmail", email);
        }catch(err){
          console.log(err);
        }
        let loggedInUser = app.currentUser;
        let id = new BSON.ObjectID(loggedInUser?.id);
        let user = new User();
        user._id = id;
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.registrationDate = date;
        user.role = "user";
        let result = this.authService.insertUser(user);
        result.then(() => {
          this.authService.user$.next(user);
          this.snackbar.open("Sikeres regisztráció!", 'OK', {panelClass: 'secondary-snackbar', horizontalPosition: 'right', verticalPosition: 'top'})
          this.dialog.closeAll();
          this.router.navigate(['/userhome']);
        });
    }
  }

  async submitExpert(){
    if(this.expertForm.valid){
      let expert = new User();
      expert.email = this.expertForm.get("email")?.value;
      expert.city = this.expertForm.get("city")?.value;
      expert.field = this.expertForm.get("field")?.value;
      expert.firstName = this.expertForm.get("firstName")?.value;
      expert.lastName = this.expertForm.get("lastName")?.value;
      expert.phone = this.expertForm.get("phone")?.value;
      expert.role = "expert"
      let password = this.expertForm.get("password")?.value;
      let res = await this.authService.signup(expert.email, password);
      let app = new Realm.App({id: this.app_id});
      const creds = Realm.Credentials.emailPassword(expert.email, password);
      this.dialog.open(SpinnerComponent);
      try{
        let user = await app.logIn(creds);
        console.assert(user.id === app.currentUser?.id);
        console.log(app.currentUser?.id);
        this.authService.loggedInUser = true;
        localStorage.setItem("userID", app.currentUser?.id as string);
        localStorage.setItem("userEmail", expert.email);
      }catch(err){
        console.error("failed to log in", err);
      }
      let user = app.currentUser;
      console.log(user);
      let id = new BSON.ObjectID(user?.id);
      expert._id = id;
      let date = new Date();
      expert.registrationDate = date;
      let result = this.authService.insertUser(expert);
      result.then(() => {
        this.authService.user$.next(expert);
        this.snackbar.open("Sikeres regisztráció!", 'OK', {panelClass: 'secondary-snackbar', horizontalPosition: 'right', verticalPosition: 'top'})
        this.dialog.closeAll();
        this.router.navigate(['/expertdashboard']);
      })
    }else{
      console.log("invalid");
    }
  }

}
