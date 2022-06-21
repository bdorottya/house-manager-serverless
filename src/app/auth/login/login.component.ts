import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  showGoogleLogin(){
    this.googleLoginShow = true;
  }

  googleLogin(){

  }
// @ts-ignore
  handleCredentialsResponse(response){
    const app = new Realm.App({
      id: "housemanager-zblhe",
    });
    console.log("valami");
    const credentials = Realm.Credentials.google(response.credential);
      console.log(credentials);
      app
        .logIn(credentials)
        .then((user) => alert(`Logged in with id: ${user.id}`));
  }
}
