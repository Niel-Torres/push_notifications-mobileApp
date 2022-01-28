import { Injectable } from '@angular/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { GlobalProvider } from '@app/providers/global.provider';

/**
 * @class
 *  Service for initialize and connect with firebase for push notifications
 */
@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  private token: string;
  private user = {};

  constructor(
    private globalProvider: GlobalProvider
  ) {}

  getToken(){
    return this.token;
  }

  setToken(token: string){
    this.token = token;
  }

  /**
   *
   * @param url
   *  POST: Save token on backend.
   */
  saveToken = (url: string) => {
    this.globalProvider
      .saveClient(url, this.user)
      .subscribe(
        (resp)=>{ console.log(resp);}
      );
  };

  /**
   * @description
   *  checkplatform and request permission to user
   *  Permission for register device on firebase and generate a token
   */
  requestPermissions = async () => {
    if (Capacitor.getPlatform() !== 'web') {
      const permissionStatus = await PushNotifications.requestPermissions();

      if(permissionStatus.receive === 'granted'){
        await PushNotifications.register();
      }else{
        //TODO: Some function with the user who does not give permission
      }
    }
  };

  addListenersForNotifications = async () => {
    // On success, Your device is registered to receive push notifications. We get a token
    await PushNotifications.addListener('registration', this.registration);

    // Some issue with your registration and the notifications will not work
    await PushNotifications.addListener('registrationError', this.registrationError);


    // Show the notification if the app is open on your device
    await PushNotifications.addListener('pushNotificationReceived', this.pushNotificationReceived);

    // Method called when tapping on a notification on your device
    await PushNotifications.addListener('pushNotificationActionPerformed',this.pushNotificationActionPerformed);
  };

  resetPushNotifications = async () => {
    await PushNotifications.removeAllDeliveredNotifications();
  };


  registration(token: Token){
    console.log('PushNotification: Registration token: ' + JSON.stringify(token.value));
  }

  registrationError(error: any){
    console.log('Error on registration: ' + JSON.stringify(error));
  }

  pushNotificationReceived(notification: PushNotificationSchema){
    console.log('Push received: ' + JSON.stringify(notification));
  }

  pushNotificationActionPerformed(notification: ActionPerformed){
    console.log('Push action performed: ' + JSON.stringify(notification));
  }

}
