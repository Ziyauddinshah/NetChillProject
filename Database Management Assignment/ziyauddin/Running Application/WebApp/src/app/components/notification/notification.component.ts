import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  message: any;
  title: string = '';
  body: string = '';
  constructor(private notificationService: NotificationService) {}
  ngOnInit() {
    this.notificationService.requestPermission();
    this.notificationService.receiveMessage();
    this.notificationService.currentMessage.subscribe(
      (res) => {
        if (res != null) {
          this.message = res;
          this.title = this.message.data.title;
          this.body = this.message.data.body;
          alert(this.title);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  sendMessage() {
    this.notificationService.sendMessage().subscribe((res) => console.log(res));
  }
}
