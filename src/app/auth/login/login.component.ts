import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

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

  googleLoginShow: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


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
          this.router.navigateByUrl('/userhome');
          console.log(user);
        }
      });
    }
  }
}
