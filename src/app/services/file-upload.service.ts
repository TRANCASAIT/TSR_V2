import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  uploadCustomer(file: File, el: any): Observable<HttpEvent<any>> {
    const { serviceRequestId, documentId, stopNumber, fileType } = el;
    const formData: FormData = new FormData();
    environment.API_URL
    formData.append('DocumentFile', file);
    formData.append('ServiceRequestId', serviceRequestId.toString());
    formData.append('DocumentId', documentId.toString());
    formData.append('StopNumber', stopNumber.toString());
    formData.append('DocumentType', fileType.toString());

    const req = new HttpRequest(
      'POST',

      `${environment.API_URL}Documents/UploadDocumentCustomer`,
      formData, {
      reportProgress: true,
    }
    );
    return this.http.request(req);
  }

  uploadAdmin(file: File, el: any): Observable<HttpEvent<any>> {
    const { serviceRequestId, documentId, stopNumber, fileType } = el;
    const formData: FormData = new FormData();
    environment.API_URL
    formData.append('DocumentFile', file);
    formData.append('ServiceRequestId', serviceRequestId.toString());
    formData.append('DocumentId', documentId.toString());
    formData.append('StopNumber', stopNumber.toString());
    formData.append('DocumentType', fileType.toString());

    const req = new HttpRequest(
      'POST',

      `${environment.API_URL}Documents/UploadDocumentAdmin`,
      formData, {
      reportProgress: true,
    }
    );
    return this.http.request(req);
  }
}
