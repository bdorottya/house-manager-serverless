import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { UserDAO } from 'src/app/user/socialUser.model';
import { BSON } from 'realm-web';
import { UserService } from 'src/app/user/user.service';

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

  app_id:string = "housemanager-zblhe";

  googleLoginShow: boolean = false;


  constructor(private userService: UserService, private authService: AuthService, private router: Router, private activated: ActivatedRoute) { }

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

googleLogin(response:any){
  const app = new Realm.App({
    id: this.app_id
  });
  const credentials = Realm.Credentials.google(response.credential);
  app.logIn(credentials).then((user) => alert(`Logged in with id: ${user.id}`));
  }


  submitLogin(){
    if(this.loginForm.valid){
      let email = this.loginForm.get("email")?.value;
      let pass = this.loginForm.get("password")?.value;
      let user = this.authService.loginWithEmailAndPass(email, pass);
      user.then(data => {
        if(data){
            const app = new Realm.App({
              id: this.app_id
            });
            let mongo = app.currentUser?.mongoClient("mongodb-atlas");
            let collection = mongo?.db("home-maker").collection("users");
            let email = localStorage.getItem("userEmail") as string;
            let res = collection?.findOne({email: email});
            res?.then(data => {
              if(data.role === "user"){
                this.router.navigateByUrl('/userhome');
              }else{
                this.router.navigate(['/expertdashboard']);
              }
            })
          }
        });
    }
  }
}
