import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform
  ) {}

  ngOnInit(){
    this.activateListenersForPushNotifications();
  }

  activateListenersForPushNotifications() {
        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
        (token: Token) => {
          alert('Push registration success, token: ' + token.value);
        }
      );
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Push received: ' + JSON.stringify(notification));
        }
      );
  
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
  }
  
  requestPermissions(){
    if(this.platform.is('capacitor')){
      PushNotifications.requestPermissions().then(result => {
        console.log("PushNotifications.requestPermissions()");
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
    } else {
        console.log("PushNotifications.requestPermissions() -> Its a not device mobile")
    }
    
  }

}
