import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private jwtHelper: JwtService, private lss: LocalstorageService, private router: Router) { }

  canActivate() {
    const token = this.lss.get();

    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired()){
      return true;
    }
    this.router.navigate(["/login"]);
    this.lss.remove();
    return false;
  }
}
