import { Injectable, OnInit } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService implements OnInit {

  private token: string;
  
  constructor() {}

  ngOnInit(): void {

  }

  getToken(){
    return this.token;
  }

  setToken(token: string){
    this.token = token;
  }

  requestPermissions(){
    if (Capacitor.getPlatform()!='web') {
      PushNotifications.requestPermissions().then(
        (permission) => {
          if (permission.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error with permissions
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }  
  }

  addListenersForNotifications(){
    // On success, Your device is registered to receive push notifications. We get a token
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log(token.value);
        this.setToken(token.value);
        alert('Push registration success, My token is: ' + JSON.stringify(token.value));
      }
    ).catch((error)=>{
        console.log(error);
      });

    // Some issue with your registration and the notifications will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    ).catch((error)=>{
      console.log(error);
    });

    // Show the notification if the app is open on your device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      //TODO: Implement the funcionality 
      }
    ).catch((error)=>{
      console.log(error);
    });
    
    // Method called when tapping on a notification on your device
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    ).catch((error)=>{
      console.log(error);
    });
  }

  resetPushNotifications(){
    PushNotifications.removeAllDeliveredNotifications()
      .catch(
        (error)=>{
          console.log(error);
        }
      );
  }
}
