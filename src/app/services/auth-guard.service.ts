import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { LocalstorageService } from './localstorage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(private jwtHelper: JwtService, private lss: LocalstorageService, private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate() {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.lss.get(); // Use the LocalStorageService to get the token
      // Check if the token is expired or not and if token is expired then redirect to login page and return false
      if (token && !this.jwtHelper.isTokenExpired()) {
        return true;
      }

      this.router.navigate(['/login']);
      this.lss.remove(); // Use the LocalStorageService to remove the token
      return false;
    }

    // If not in the browser, just allow the navigation without any checks
    return true;
  }
}
