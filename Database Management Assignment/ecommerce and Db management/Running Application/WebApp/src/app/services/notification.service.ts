import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class NotificationService implements OnInit {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {}
  requestPermission() {
    this.angularFireMessaging.requestPermission.subscribe({
      next: (res) => {
        console.log('notification permission: ', res);
        this.receiveToken();
      },
      error: (err) => {
        console.error('Unable to get permission to notify.', err);
      },
    });
  }
  receiveToken() {
    this.angularFireMessaging.requestToken.subscribe((token: any) => {
      console.log('token: ', token);
      localStorage.setItem('messageToken', token);
    });
  }
  receiveMessage() {
    return this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
  sendMessage() {
    const messageToken = localStorage.getItem('messageToken');
    const formData = {
      data: {
        title: 'Notification for testing',
        body: 'Hello from Ziyauddin!!',
      },
      to: messageToken,
    };
    const serverKey =
      'AAAAlw-yYjw:APA91bEJhZn-3g2OLKfN0ekcLExxXgZdH_7XPX1AUwAt0EKrcF5MSsZ70eZgSIyQDMSa_elBFvnZ2XdEoZ04hy1ITokQiXt2uAKINXP9RkxEWxsFLdB01Kscvmw9tgk_EQYtBNP_yYXn';
    return this.httpClient.post(
      'https://fcm.googleapis.com/fcm/send',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${serverKey}`,
        },
      }
    );
  }
}
