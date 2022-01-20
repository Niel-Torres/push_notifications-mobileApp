import { Injectable } from '@angular/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  private token: string;
  
  constructor() {}

  getToken(){
    return this.token;    
  }

  setToken(token: string){
    this.token = token;
  }

  requestPermissions = async () => {
    if (Capacitor.getPlatform()!='web') {
      let permissionStatus = await PushNotifications.requestPermissions();
      
      if(permissionStatus.receive === 'granted'){
        await PushNotifications.register();  
      }else{
        //TODO: Some function with the user who does not give permission
      }
    }  
  }

  addListenersForNotifications = async () => {
    // On success, Your device is registered to receive push notifications. We get a token
    await PushNotifications.addListener('registration', this.registration);

    // Some issue with your registration and the notifications will not work
    await PushNotifications.addListener('registrationError', this.registrationError);

    
    // Show the notification if the app is open on your device
    await PushNotifications.addListener('pushNotificationReceived', this.pushNotificationReceived);

    // Method called when tapping on a notification on your device
    await PushNotifications.addListener('pushNotificationActionPerformed',this.pushNotificationActionPerformed)
  }

  resetPushNotifications = async() => {
    await PushNotifications.removeAllDeliveredNotifications();
  } 
  

  registration(token: Token){
    this.setToken(token.value);
    console.info('PushNotification: Registration token: ' + JSON.stringify(token.value));
  }

  registrationError(error: any){
    console.info('Error on registration: ' + JSON.stringify(error)); 
  }

  pushNotificationReceived(notification: PushNotificationSchema){
    console.info('Push received: ' + JSON.stringify(notification));
  }

  pushNotificationActionPerformed(notification: ActionPerformed){
    console.info('Push action performed: ' + JSON.stringify(notification));
  }


}
