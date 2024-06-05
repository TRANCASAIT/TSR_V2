import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { CityComponent } from '../../dialogs/city/city.component';
import { SnackbarService } from '../../services/snackbar.service';
import { ApiService } from '../../services/api.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { LogoutService } from '../../services/logout.service';
import { HelpersService } from '../../services/helpers.service';
import {
  bottomToTopAnimation,
  topToBottomAnimation,
} from '../../animations/tsr_animations';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
  animations: [bottomToTopAnimation, topToBottomAnimation],
})
export class CitiesComponent implements OnInit {
  spinnerOk: Boolean = false;
  value = 50;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  showTable: boolean = true;
  showAnimation: boolean = false;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['state', 'city', 'option'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;

  @ViewChild('inputSearch', { static: false }) inputSearch!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private API: ApiService,
    private _snackBar: SnackbarService,
    private logOut: LogoutService,
    private helpers: HelpersService
  ) {}

  ngOnInit() {
    this.spinnerOk = true;
    setTimeout(() => {
      this.getData();
    }, 2000);
  }

  getData() {
    this.API.getCities().subscribe({
      next: (res: any) => {
        this.spinnerOk = false;
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data.length = res.length;
        this.dataObs$ = this.dataSource.connect();
        this.checkSearchBar();
        this.showTable = false;
      },
      error: (err) => {
        this.spinnerOk = false;
        this.helpers.returnError(err);
      },
    });
  }

  openDialog(obj: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.data = obj;
    dialogConfig.panelClass = '';
    const dialogRef = this.dialog.open(CityComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getData();
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkSearchBar() {
    const filterValue = this.inputSearch.nativeElement.value;
    if (filterValue.trim()) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}
