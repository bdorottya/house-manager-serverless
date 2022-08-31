import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { UserDAO } from 'src/app/user/socialUser.model';
import { BSON } from 'realm-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {



  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  email!:string;
  firstName!:string;
  lastName!:string;
  date!:Date;
  avatar!:string;
  phone!:string
  firstLogin!:boolean;

  googleLoginShow: boolean = false;


  constructor(private authService: AuthService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.queryParams.subscribe(params => {
      this.email = params['email'];
      this.firstName = params['firstName'];
      this.lastName = params['lastName'];
      this.date = params['date'];
      this.avatar = params['avatar'];
      this.phone = params['phone'];
      this.firstLogin = params['firstLogin'];
    });

}

googleLogin(){
  // The redirect URI should be on the same domain as this app and
  // specified in the auth provider configuration.
  const redirectUri = "https://localhost:4200/userhome";
  const credentials = Realm.Credentials.google(redirectUri);
  // Calling logIn() opens a Google authentication screen in a new window.
  this.authService.googleLogin(credentials);
}

  submitLogin(){
    if(this.loginForm.valid){
      let email = this.loginForm.get("email")?.value;
      let pass = this.loginForm.get("password")?.value;
      let user = this.authService.loginWithEmailAndPass(email, pass);
      user.then(data => {
        if(data){
          if(this.firstLogin){
            let id = localStorage.getItem("userID") as string;
            let _id = new BSON.ObjectId(id);
            let newUser = new UserDAO(_id,this.email,this.firstName,this.lastName,this.date,this.avatar,this.phone);
            const res = this.authService.insertUser(newUser);
            if(res){
              this.router.navigateByUrl('/userhome');
              console.log(res);
            }
          }
            this.router.navigateByUrl('/userhome');
          }
        });
    }
  }
}
