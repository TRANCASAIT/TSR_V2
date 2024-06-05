import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerguardService {

  constructor(private authService: JwtService, private router: Router, private lss: LocalstorageService) {}

  canActivate(next: ActivatedRoute, state: RouterStateSnapshot) {
    if(this.authService.isUserCustomer())
      return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.lss.remove();
    return false;
  }
}
