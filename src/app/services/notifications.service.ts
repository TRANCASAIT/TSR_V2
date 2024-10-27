import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';  // Importing SignalR module
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private hubConnection: signalR.HubConnection | null = null;
  private newRecordSubject = new Subject<void>();
  private updatedRecordSubject = new Subject<void>();
  private removedRecordSubject = new Subject<void>();
  private updatedRecordDocSubject = new Subject<void>();
  private newCommentSubject = new Subject<void>();
  private connStoppedSbj = new Subject<void>();

  constructor() {
    const _token = localStorage.getItem('Token');
    const options: signalR.IHttpConnectionOptions = {
      accessTokenFactory: () => {
        if (!_token) {
          console.warn('No token found in localStorage.');
          return ''; // Handle the case where the token is missing.
        }
        return String(_token);
      },
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.WSOCK_URL + 'notificationHub', options)
      .build();

    this.initializeHubListeners();
  }

  private initializeHubListeners() {
    if (!this.hubConnection) return;

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
  }

  getNewRecordObservable(): Observable<void> {
    return this.newRecordSubject.asObservable();
  }

  getUpdatedRecordObservable(): Observable<void> {
    return this.updatedRecordSubject.asObservable();
  }

  getRemovedRecordObservable(): Observable<void> {
    return this.removedRecordSubject.asObservable();
  }

  getUpdatedRecordDocObservable(): Observable<void> {
    return this.updatedRecordDocSubject.asObservable();
  }

  getNewCommentObservable(): Observable<void> {
    return this.newCommentSubject.asObservable();
  }

  public startConnection(retries = 3) {
    if (!this.hubConnection) return;

    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection
        .start()
        .then(() => console.log('SignalR connection started.'))
        .catch((err) => {
          console.error('Error while starting SignalR connection: ', err);
          if (retries > 0) {
            console.log(`Retrying connection... (${retries} attempts left)`);
            setTimeout(() => this.startConnection(retries - 1), 3000);
          }
        });
    } else {
      console.warn(
        'Connection is not in the Disconnected state:',
        this.hubConnection.state
      );
    }
  }

  public stopConnection() {
    if (!this.hubConnection) return;

    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .stop()
        .then(() => {
          console.log('SignalR connection stopped.');
          this.connStoppedSbj.next();
        })
        .catch((err) => console.error('Error while stopping SignalR connection: ', err));
    }
  }

  public checkConnection(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected || false;
  }

  getConnectionStoppedObservable(): Observable<void> {
    return this.connStoppedSbj.asObservable();
  }

  ngOnDestroy() {
    this.newRecordSubject.complete();
    this.updatedRecordSubject.complete();
    this.removedRecordSubject.complete();
    this.updatedRecordDocSubject.complete();
    this.newCommentSubject.complete();
    this.connStoppedSbj.complete();
    this.stopConnection();
  }
}

