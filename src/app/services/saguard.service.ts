import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SaguardService {

  constructor(private authService: JwtService, private router: Router, private lss: LocalstorageService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isUserSA())
      return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.lss.remove();
    return false;
  }
}
