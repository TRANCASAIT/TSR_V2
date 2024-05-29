import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;

  constructor() {

  }

  async startConnection(url: string, transportType: signalR.HttpTransportType) {
    const _token = localStorage.getItem('Token');

    const options: signalR.IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return String(_token);
      }
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(url, options
    )
    .build();

    await this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  addReceiveMessageListener(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error('Error while sending message: ' + err));
  }

  stopConnection(): void {
    this.hubConnection?.stop()
      .then(() => console.log('Connection stopped'))
      .catch(err => console.error('Error while stopping connection: ' + err));
  }
}
