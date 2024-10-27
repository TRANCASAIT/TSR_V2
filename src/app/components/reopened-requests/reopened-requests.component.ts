import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HelpersService } from '../../services/helpers.service';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReopenedRequestComponent } from '../../dialogs/reopened-request/reopened-request.component';
import { bottomToTopAnimation } from '../../animations/tsr_animations';

@Component({
  selector: 'app-reopened-requests',
  templateUrl: './reopened-requests.component.html',
  styleUrl: './reopened-requests.component.scss',
  animations: [bottomToTopAnimation]
})
export class ReopenedRequestsComponent implements OnInit {

  //spinner options
  spinner: Boolean = false;
  value = 50;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  showTable: boolean = true;

  //table options
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['service','status', 'option'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;
  @ViewChild('inputSearch', { static: false }) inputSearch!: ElementRef;

  /**
   *
   */
  constructor(
    public dialog: MatDialog,
    private API: ApiService,
    private helpers: HelpersService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.API.getDecompletedRequests().subscribe({
      next: (res: any) => {
        this.spinner = false;
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data.length = res.length;
        this.dataObs$ = this.dataSource.connect();
        this.showTable = false;
      },
      error: (err: any) => {
        this.spinner = false;
        this.helpers.returnError(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(obj:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.data = obj;
    dialogConfig.panelClass = '';
    const dialogRef = this.dialog.open(ReopenedRequestComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getData();
      }
    });
  }
}
