import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Route, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private jwt: JwtService,
    private API: ApiService,
    private router: Router,
    private snackBar: SnackbarService,
    private lss: LocalstorageService,
  ) { }

  logOut() {
    let uid = this.jwt.getUid();
    if (uid) {
      this.API.logOut(Number(uid)).subscribe({
        next: (res: any) => {
          if(res){
            const { state, message } = res;
            if(state === 0){
              this.router.navigate(['/login']);
              this.snackBar.snackBarMessage(message, true);
            }
          }
          this.lss.remove();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
