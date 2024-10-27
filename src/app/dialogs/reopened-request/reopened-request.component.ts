import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { HelpersService } from '../../services/helpers.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ReopenedRequest } from '../../interfaces/reopenedRequest';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { leftToRightAnimation } from '../../animations/tsr_animations';

@Component({
  selector: 'app-reopened-request',
  templateUrl: './reopened-request.component.html',
  styleUrl: './reopened-request.component.scss',
  animations: [leftToRightAnimation]
})
export class ReopenedRequestComponent implements OnInit {
  /**
   *
   */
  serviceId: number = 0;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['reason', 'lastModifiedBy', 'modifiedAt'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;
  serviceRequests: ReopenedRequest[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public service: any,
    public dialogRef: MatDialogRef<ReopenedRequestComponent>,
    private API: ApiService,
    private _snackBar: SnackbarService,
    private helpers: HelpersService
  ) {}

  ngOnInit(): void {
    const { service } = this.service;
    if (service > 0) {
      this.serviceId = service;
      this.getServiceRequest(service);
    }
  }

  getServiceRequest(service: number) {
    this.API.getDecompletedRequestsFull(service).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data.length = res.length;
        this.dataObs$ = this.dataSource.connect();
      },
      error: (err: any) => {
        this.helpers.returnError(err);
      },
    });
  }
}
