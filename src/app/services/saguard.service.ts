import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { LocalstorageService } from './localstorage.service';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root'
})
export class SaguardService {

  constructor(private authService: JwtService, private router: Router, private lss: LocalstorageService, private logOut: LogoutService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isUserSA())
      return true;

    this.logOut.logOut();
    return false;
  }
}
