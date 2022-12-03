import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
      var isAuthenticated = this.authService.isLoggedIn();
      if (!isAuthenticated) {
          this.router.navigateByUrl('/pleasesignin');
      }
      return isAuthenticated;
  }
}

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Promise<boolean> {
    let user = localStorage.getItem('role') as string;
    let result:boolean;
    if(user != 'user'){
      this.router.navigate(['/expertdashboard']);
      result = false;
    }else{
      result = true;
    }

    return result;
  }
}

@Injectable()
export class ExpertTypeGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Promise<boolean> {
    let user = localStorage.getItem('role') as string;
    let result:boolean;
    if(user != 'expert'){
      this.router.navigate(['/userhome']);
      result = false;
    }else{
      result = true;
    }

    return result;

  }
}
