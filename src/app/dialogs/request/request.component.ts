import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { HttpClient } from '@microsoft/signalr';
import { Router } from 'express';
import { environment } from '../../../environments/environment.development';
import { SnackbarService } from '../../services/snackbar.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { ApiService } from '../../services/api.service';
import { JwtService } from '../../services/jwt.service';
import { CreateRequest } from '../../interfaces/serviceRequest';
import { LogoutService } from '../../services/logout.service';
import { leftToRightAnimation, rightToLeftAnimation } from '../../animations/tsr_animations';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  animations: [leftToRightAnimation]

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

  //dynamic titles
  btnTxt: string = '';
  errorMsgFrm: string = '';

  constructor(
    public dialogRef: MatDialogRef<RequestComponent>,
    public dialog: MatDialog,
    private API: ApiService,
    private _snackBar: SnackbarService,
    private jwtts: JwtService,
    private logOut: LogoutService
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
          }
        },
        error: (err) => {
          if (err.error !== undefined) {
            const { state, message } = err.error;
            state === 1
              ? this._snackBar.snackBarMessage(message, false)
              : state === 401
              ? this.logOut.logOut()
              : null;
          }
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
        if (err.error !== undefined) {
          const { state, message } = err.error;
          state === 1
            ? this._snackBar.snackBarMessage(message, false)
            : state === 401
            ? this.logOut.logOut()
            : this._snackBar.snackBarMessage(
                'Algo ha salido mal, intente mas tarde.',
                false
              );
        } else {
          this._snackBar.snackBarMessage(
            'Algo ha salido mal, intente mas tarde.',
            false
          );
        }
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
        if (err.error !== undefined) {
          const { state, message } = err.error;
          state === 1
            ? this._snackBar.snackBarMessage(message, false)
            : state === 401
            ? this.logOut.logOut()
            : this._snackBar.snackBarMessage(
                'Algo ha salido mal, intente mas tarde.',
                false
              );
        } else {
          this._snackBar.snackBarMessage(
            'Algo ha salido mal, intente mas tarde.',
            false
          );
        }
      },
    });
  }
}
