import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestComponent } from '../../dialogs/request/request.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit{

  isCustomer = false;
  customerType : string = '';

  //table options
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['invoice', 'customer', 'reference', 'box',
    'operation', 'stops', 'created', 'tmw', 'uuid', 'tmw-time', 'ccp-time', 'status',  'files', 'option'];
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  dataObs$!: Observable<any>;

  //spinner options
  spinner: Boolean = false;
  value = 50;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  options = new FormGroup({
    boxNumber: new FormControl(null),
    invoiceNumber: new FormControl(null),
    status: new FormControl(null),
    operation: new FormControl(null),
    customer: new FormControl(null),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  statusList: [] = []!;
  operationsList: [] = []!;
  customersList: any;

  public companyCtrl: FormControl = new FormControl();

  public companyFilterCtrl: FormControl = new FormControl();

  public filteredCompanies: ReplaySubject<any[]> = new ReplaySubject(1);

  protected _onDestroy = new Subject();

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  constructor(
    private API: ApiService,
    private _snackBar: SnackbarService,
    public dialog: MatDialog,

  ){

  }
  ngOnInit(): void {
    this.getSR();
  }


  getSR() : any{

    this.API.getServiceRequest().subscribe({
      next: (res: any) => {
        this.spinner = false;
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data.length = res.length;
        this.dataObs$ = this.dataSource.connect();
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }


  openDialog(obj: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.data = obj;
    dialogConfig.panelClass = '';
    const dialogRef = this.dialog.open(RequestComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.getSR();
      }
    });
  }

  updateBoxNumber(elem: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = elem;
    if ((elem.status === 1) && (this.isCustomer === true)) {
      // const dialogConfirm = this.dialog.open(UpdateBox, dialogConfig);
      // dialogConfirm.afterClosed().subscribe(confirm => {
      //   this.checkFilters();
      // });
    }
  }

  updateReference(elem: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = elem;
    if ((elem.status === 1) && (this.isCustomer === true)) {
      // const dialogConfirm = this.dialog.open(UpdateReference, dialogConfig);
      // dialogConfirm.afterClosed().subscribe(confirm => {
      //   this.checkFilters();
      // });
    }
  }

  updateOperation(elem: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = elem;
    if ((elem.status === 1) && (this.isCustomer === true)) {
      // const dialogConfirm = this.dialog.open(UpdateOperation, dialogConfig);
      // dialogConfirm.afterClosed().subscribe(confirm => {
      //   this.checkFilters();
      // });
    }
  }

  updateUuid(elem: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = elem;
    if (elem.status < 5 && this.isCustomer === false) {
      // const dialogConfirm = this.dialog.open(UuidDialog, dialogConfig);
      // dialogConfirm.afterClosed().subscribe(confirm => {
      //   this.getSR();
      // });
    }
  }

  updateTMW(elem: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = elem;
    if ((elem.status === 2 || elem.status === 3 || elem.status === 4) && (this.isCustomer === false)) {
      // const dialogConfirm = this.dialog.open(UpdateTmw, dialogConfig);
      // dialogConfirm.afterClosed().subscribe(confirm => {
      //   this.checkFilters();
      // });
    }
  }

  documentDialog(obj: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '92%';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.data = obj;
    dialogConfig.panelClass = '';
    // const dialogRef = this.dialog.open(DocumDentsComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe({
    //   next: (res) => {
    //     this.checkFilters();
    //   }
    // });
  }

  removeRequest(elem: any, statusId: any) {
    if (this.isCustomer && statusId === 1) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = elem;
      // const dialogConfirm = this.dialog.open(RemoveRequestDialog, dialogConfig);
      // dialogConfirm.afterClosed().subscribe(confirm => {

      //   if (confirm !== undefined) {
      //     if (confirm.data) {
      //       let obj = {
      //         ServiceRequestId: elem.serviceRequestId
      //       }
      //       this.http.post<any>(`${environment.API_URL}ServiceRequests/RemoveServiceRequest`, obj).subscribe({
      //         next: (res) => {
      //           if (res.state === 0) {
      //             this._snackBar.snackBarMessage(res.message, true);
      //             this.checkFilters();
      //           }
      //         },
      //         error: (err) => {
      //           if (err.error !== undefined) {
      //             if (err.error.state !== undefined) {
      //               if(err.error.state === 1){
      //                this._snackBar.snackBarMessage(err.error.message, false);
      //               }else if(err.error.state === 401){
      //                 this.router.navigateByUrl('/login');
      //               }
      //             } else {
      //               this._snackBar.snackBarMessage('Something went wrong', false);
      //             }
      //           }
      //         }
      //       });
      //     }
      //   } else {
      //     this.checkFilters();
      //   }
      // });
    }
  }

  cleanFilters() {
    this.options.controls['boxNumber'].setValue(null);
    this.options.controls['invoiceNumber'].setValue(null);
    this.options.controls['status'].setValue(null);
    this.options.controls['operation'].setValue(null);
    this.options.controls['customer'].setValue(null);
    this.options.controls['start'].setValue(null);
    this.options.controls['end'].setValue(null);
    this.getSR();
  }

  convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  search(obj: any) {
    let { boxNumber,
      invoiceNumber,
      status,
      operation,
      customer,
      priority,
      start,
      end } = obj;

    this.spinner = true;

    if (start !== null && end !== null) {
      start = this.convert(start);
      end = this.convert(end);
    }

    if (boxNumber === null) {
      boxNumber = boxNumber
    } else if (boxNumber === "") {
      boxNumber = null;
    }

    if (invoiceNumber === null) {
      invoiceNumber = invoiceNumber
    } else if (invoiceNumber === "") {
      invoiceNumber = null;
    }


    if (priority === true) {
      priority = priority;
    } else {
      priority = null;
    }

    //call
    let _obj = {
      StatusId: status,
      OperationTypeId: operation,
      InvoiceNumber: invoiceNumber,
      BoxNumber: boxNumber,
      CustomerId: customer,
      Start: start,
      End: end,
      Priority: priority
    }

    // this.API.getServicesFiltered(_obj).subscribe({
    //   next: (res: any) => {
    //     //stop spinner
    //     this.spinner = false;
    //     this.dataSource = new MatTableDataSource<any>(res);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.data.length = res.length;
    //     this.dataObs$ = this.dataSource.connect();
    //   },
    //   error: (err) => {
    //     //stop spinner
    //     this.dataSource = new MatTableDataSource<any>();
    //     this.spinner = false;
    //     if (err.status !== undefined) {
    //       if (err.error.state !== undefined) {
    //         if (err.error.state === 1) {
    //           this._snackBar.snackBarMessage(err.error.message, false);
    //         }else if(err.error.state === 401){
    //           this.router.navigateByUrl('/login');
    //         }
    //       } else if (err.status === 0) {
    //         this._snackBar.snackBarMessage(err.statusText, false);
    //       } else {
    //         this._snackBar.snackBarMessage('Something went wrong', false);
    //       }
    //     } else {
    //       this._snackBar.snackBarMessage('Something went wrong', false);
    //     }
    //   }
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
