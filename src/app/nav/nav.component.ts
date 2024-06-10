import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  _userType = this.jwt.getRole();
  menu: Menu[] = [];
  title: string = '';
  user: String = '';
  private _mobileQueryListener: () => void;
  private destroy$ = new Subject<void>();

  constructor(
    private cdf: ChangeDetectorRef,
    private media: MediaMatcher,
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

  ngOnInit(): void {
    this.user = this.jwt.getUserName();
    this.cargarMenu();
  }

  cargarMenu() {
    this._menuService.getMenu(this._userType).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.menu = data;
    });
  }

  cerrarNav() {
    this.cargarMenu();
  }

  logOut() {
    this.logOutSer.logOut();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
