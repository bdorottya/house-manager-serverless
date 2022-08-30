import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    passwordAgain: new FormControl('')
  });

  expertForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    passwordAgain: new FormControl(''),
    field: new FormControl(''),
    city: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async submitSignup(){
    if(this.signupForm.valid){
      let email = this.signupForm.get("email")?.value;
      let password = this.signupForm.get("password")?.value;
      let lastName = this.signupForm.get("lastName")?.value;
      let firstName = this.signupForm.get("firstName")?.value;
      let date = new Date()
      let res = await this.authService.signup(email, password);
      console.log("afterSugnup: ", res);
      this.router.navigate(["/firstlogin"], {queryParams: {email: email, lastName: lastName, firstName: firstName, date: date}});
    }
  }

  async submitExpert(){}

}
