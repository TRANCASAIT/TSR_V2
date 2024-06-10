import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SnackbarService } from '../../services/snackbar.service';
import { ApiService } from '../../services/api.service';
import { JwtService } from '../../services/jwt.service';
import { CreateRequest } from '../../interfaces/serviceRequest';
import { leftToRightAnimation } from '../../animations/tsr_animations';
import { HelpersService } from '../../services/helpers.service';
import { MyErrorStateMatcher } from '../../shared/errorMatcher';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  animations: [leftToRightAnimation],
})
export class RequestComponent implements OnInit {
  spinnerOk: Boolean = false;
  value = 50;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  stopsList: any;
  operationsList: any;
  matcher = new MyErrorStateMatcher();
  type: string | undefined;

  requestForm = new FormGroup({
    serviceRequestId: new FormControl(0),
    boxNumber: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required]),
    stopId: new FormControl(null, [Validators.required]),
    operationTypeId: new FormControl(null, [Validators.required]),
  });

  get formGroupCompany() {
    return this.requestForm.controls;
  }

  btnTxt: string = '';
  errorMsgFrm: string = '';

  constructor(
    public dialogRef: MatDialogRef<RequestComponent>,
    public dialog: MatDialog,
    private API: ApiService,
    private _snackBar: SnackbarService,
    private jwtts: JwtService,
    private helpers: HelpersService
  ) {}

  async ngOnInit() {
    this.btnTxt = 'Agregar';
    this.errorMsgFrm = 'Este campo es requerido';
    await this.getOperations();
    await this.getStops();
  }

  registerRequest(obj: any) {
    if (this.requestForm.invalid) return;
    const { boxNumber, reference, stopId, operationTypeId } = obj;
    let customerId = this.jwtts.getCustomerId();
    if (Number(customerId) > 0) {
      let _obj: CreateRequest = {
        BoxNumber: boxNumber,
        Reference: reference,
        StopId: stopId,
        OperationTypeId: operationTypeId,
        CustomerId: customerId,
      };
      this.spinnerOk = true;
      this.API.addRequest(_obj).subscribe({
        next: (res: any) => {
          if (res.state !== undefined) {
            const { state, message } = res;
            this._snackBar.snackBarMessage(message, true);
            this.close();
          }
        },
        error: (err) => {
          this.helpers.returnError(err);
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  async getOperations() {
    await this.API.getOperationTypes().subscribe({
      next: (res: any) => {
        this.operationsList = res;
      },
      error: (err) => {
        this.operationsList = [];
        this.helpers.returnError(err);
      },
    });
  }

  async getStops() {
    await this.API.getStops().subscribe({
      next: (res: any) => {
        this.stopsList = res;
      },
      error: (err) => {
        this.stopsList = [];
        this.helpers.returnError(err);
      },
    });
  }
}
