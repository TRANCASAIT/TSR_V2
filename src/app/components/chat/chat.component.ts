import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  messageText: string = '';
  messages: { user: string, message: string }[] = [];

  constructor(private chatService: SignalRService) {}

  ngOnInit(): void {
    this.chatService.startConnection('https://localhost:7262/' + 'ChatHub', signalR.HttpTransportType.WebSockets);
    this.chatService.addReceiveMessageListener(this.onReceiveMessage.bind(this));
  }

  ngOnDestroy(): void {
    this.chatService.stopConnection();
  }

  onReceiveMessage(user: string, message: string): void {
    this.messages.push({ user, message });
  }

  sendMessage(): void {
    const user = 'User'; // Replace with actual user info
    this.chatService.sendMessage(user, this.messageText);
    this.messageText = '';
  }
}
