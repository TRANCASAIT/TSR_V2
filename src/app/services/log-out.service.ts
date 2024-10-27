import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { NotificationsService } from './notifications.service';
import { SnackbarService } from './snackbar.service';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(
    private jwt: JwtService,
    private API: ApiService,
    private router: Router,
    private snackBar:SnackbarService,
    private lss: LocalstorageService,
    private signal: NotificationsService
  ) { }


  logOut() {
    let uid = this.jwt.getUid();
    if (uid) {
      this.API.logOut(Number(uid)).subscribe({
        next: (res: any) => {
          if(res.state !== undefined && res.state !== null){
            const { state, message } = res;
            if(state === 0){
              this.signal.stopConnection();
              this.router.navigate(['/login']);
              this.snackBar.snackBarMessage(message, true);
              this.lss.remove();
            }
          }
        },
        error: (err) => {
          this.snackBar.snackBarMessage('Algo ha salido mal', false);
        },
      });
    }
  }
}
