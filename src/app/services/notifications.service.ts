import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private hubConnection!: signalR.HubConnection;
  private newRecordSubject = new Subject<void>();
  private updatedRecordSubject = new Subject<void>();
  private removedRecordSubject = new Subject<void>();
  private updatedRecordDocSubject = new Subject<void>();
  private newCommentSubject = new Subject<void>();

  constructor() {
    const _token = localStorage.getItem('Token');
    const options: signalR.IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return String(_token);
      }
    };

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.WSOCK_URL + 'notificationHub', options)
      .build();

    this.hubConnection.on('NewRecordAdded', () => {
      this.newRecordSubject.next();
    });

    this.hubConnection.on('RecordUpdated', () => {
      this.updatedRecordSubject.next();
    });

    this.hubConnection.on('RecordRemoved', () => {
      this.removedRecordSubject.next();
    });

    this.hubConnection.on('RecordDocumentUpdated', () => {
      this.updatedRecordDocSubject.next();
    });

    this.hubConnection.on('MessageAdded', () => {
      this.newCommentSubject.next();
    });

    // this.hubConnection.start()
    //   .catch(err => console.error(err));
  }

  getNewRecordObservable() {
    return this.newRecordSubject.asObservable();
  }

  getUpdatedRecordObservable(){
    return this.updatedRecordSubject.asObservable();
  }

  getRemovedRecordObservable() {
    return this.removedRecordSubject.asObservable();
  }

  getUpdatedRecordDocObservable(){
    return this.updatedRecordDocSubject.asObservable();
  }

  getNewCommentObservable(){
    return this.newCommentSubject.asObservable();
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) => console.error('Error while starting SignalR connection: ', err));
  }

  public stopConnection() {
    this.hubConnection
      .stop()
      .then(() => console.log('SignalR connection stopped'))
      .catch((err) => console.error('Error while stopping SignalR connection: ', err));
  }
}
