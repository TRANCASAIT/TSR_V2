import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { LogOutService } from './log-out.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService {

  constructor(private authService: JwtService, private router: Router, private lss: LocalstorageService, private logOut: LogOutService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isUserAdmin())
      return true;

    this.logOut.logOut();
    return false;
  }
}
