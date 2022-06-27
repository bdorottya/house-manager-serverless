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
    //@ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log('Google\'s One-tap sign in script loaded!');

      // @ts-ignore
      google.accounts.id.initialize({
        // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        client_id: '383591626747-5e5o5sgr7rrvi9ml6431rdpfesuitkon.apps.googleusercontent.com',
        callback: this.handleCredentialsResponse.bind(this), // Whatever function you want to trigger...
        auto_select: true,
        cancel_on_tap_outside: false
      });
  };
}

loadGoogleLogin(){
  //@ts-ignore
  google.accounts.id.initialize({
    // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
    client_id: '383591626747-5e5o5sgr7rrvi9ml6431rdpfesuitkon.apps.googleusercontent.com',
    callback: this.handleCredentialsResponse.bind(this), // Whatever function you want to trigger...
    auto_select: true,
    cancel_on_tap_outside: false
  });
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
// @ts-ignore
  handleCredentialsResponse(response){
    const credentials = Realm.Credentials.google(response.credential);
    let user = this.authService.googleLogin(credentials);
    user.then(data => {
      if(data){
        
        this.router.navigateByUrl('/userhome');
      }
    })
  }
}
