import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Login } from '../interfaces/login';
import { verificationCode } from '../interfaces/verificationCode';
import {
  CreateRequest,
  RemoveService,
  ReturnToState,
  UpdateBox,
  UpdateConsignmentNote,
  UpdateLayoutStatus,
  UpdateOperation,
  UpdateReference,
  UpdateTmw,
  UpdateUuid,
} from '../interfaces/serviceRequest';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  _URL: string = environment.API_URL;
  constructor(private http: HttpClient) {}

  login(obj: Login) {
    return this.http.post(`${this._URL}Login`, obj);
  }

  logOut(uid: number) {
    return this.http.post(`${this._URL}Login/Logout/${uid}`, {});
  }

  validateEmail(email: string) {
    return this.http.post(
      `${environment.API_URL}ResetSessions/CheckEmailSession/${email}`,
      {}
    );
  }

  validateCode(obj: any) {
    return this.http.post(
      `${environment.API_URL}ResetSessions/CheckCodeSession`,
      obj
    );
  }

  //?ServiceRequests
  getServiceRequest() {
    return this.http.get(`${this._URL}ServiceRequests/GetServices`);
  }

  getDocuments(id: any) {
    return this.http.get(`${this._URL}Documents/GetDocuments?id=${id}`);
  }

  removeRequest(obj: RemoveService): any {
    return this.http.post(
      `${this._URL}ServiceRequests/RemoveServiceRequest`,
      obj
    );
  }

  returnToState(obj: ReturnToState): any {
    return this.http.post(
      `${this._URL}ServiceRequests/ReturnToFileUpload`,
      obj
    );
  }

  updateBoxNumber(obj: UpdateBox) {
    return this.http.post(`${this._URL}ServiceRequests/UpdateBox`, obj);
  }

  updateReference(obj: UpdateReference) {
    return this.http.post(`${this._URL}ServiceRequests/UpdateReference`, obj);
  }

  updateOperationType(obj: UpdateOperation) {
    return this.http.post(`${this._URL}ServiceRequests/UpdateOperation`, obj);
  }

  updateTmw(obj: UpdateTmw) {
    return this.http.post(`${this._URL}ServiceRequests/UpdateTmw`, obj);
  }

  updateUuid(obj: UpdateUuid) {
    return this.http.post(`${this._URL}ServiceRequests/UpdateUuid`, obj);
  }

  addRequest(obj: CreateRequest) {
    return this.http.post(`${this._URL}ServiceRequests/CreateRequest`, obj);
  }

  //?Documents
  updateConsigmentNote(obj: UpdateConsignmentNote) {
    return this.http.post(`${this._URL}Documents/UpdateConsignmentNote`, obj);
  }

  updateLayoutStatus(obj: UpdateLayoutStatus) {
    return this.http.post(`${this._URL}`, obj);
  }

  getCustomers() {
    return this.http.get(`${this._URL}Customers/GetCustomers`);
  }

  getCompaniesForCustomers() {
    return this.http.get(`${this._URL}Customers/GetCustomerForCustomers`);
  }

  getOperationTypes() {
    return this.http.get(`${this._URL}OperationTypes/GetOperationTypes`);
  }

  getStatus() {
    return this.http.get(`${this._URL}Status/GetStatus`);
  }

  getStops(){
    return this.http.get(`${this._URL}Stops/GetStops`);
  }
}
