import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Menu } from '../interfaces/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { JwtService } from '../services/jwt.service';
import { ApiService } from '../services/api.service';
import { LocalstorageService } from '../services/localstorage.service';
import { SnackbarService } from '../services/snackbar.service';
import { LogoutService } from '../services/logout.service';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnDestroy {
  //declare instances
  mobileQuery: MediaQueryList;
  _userType = this.jwt.getRole();
  menu: Menu[] = [];
  title: string = '';
  user: String = '';
  _mobileQueryListener: () => void;

  constructor(
    cdf: ChangeDetectorRef,
    media: MediaMatcher,
    private _menuService: MenuService,
    private signalRService: SignalRService,
        private jwt: JwtService,
    private API: ApiService,
    private lss: LocalstorageService,
    private snackBar: SnackbarService,
    private logOutSer: LogoutService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => cdf.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.user = this.jwt.getUserName();
    this.cargarMenu();
  }

  cargarMenu() {
    this._menuService.getMenu(this._userType).subscribe((data) => {
      this.menu = data;
    });
  }

  shouldRun = true;
  cerrarNav() {
    this.cargarMenu();
  }

  logOut() {
    this.logOutSer.logOut();
  }

}
