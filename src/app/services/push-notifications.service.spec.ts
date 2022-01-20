import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { PushNotificationsService } from './push-notifications.service';
import { Capacitor } from '@capacitor/core';

describe('(3) Test of PushNotificationsService', () => {
  
  let service: PushNotificationsService;

  beforeEach( () => {

    TestBed.configureTestingModule({
      providers: [
        PushNotificationsService 
      ]
    });
    service = TestBed.inject(PushNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be Set/Get token', ()=> {
    service.setToken('xZas-12345');
    const token = service.getToken();
    expect(service.getToken()).toBe('xZas-12345');
  });
 
  describe('requestPermissions', () => {
    beforeEach( () => {
      spyOn(PushNotifications, 'requestPermissions');
      (PushNotifications.requestPermissions as any)
        .and.returnValue(Promise.resolve({receive: 'granted'}));

      service = TestBed.inject(PushNotificationsService); 
    });

    it('If the device is mobile -> should called requestPermission and resolve with status = granted', async()=> {
      spyOn(Capacitor, 'getPlatform').and.returnValue('android');  
      spyOn(PushNotifications, 'register')
      await service.requestPermissions();
      expect(PushNotifications.register).toHaveBeenCalledTimes(1);
    });

    
    it('If the device is mobile -> should called requestPermission and resolve with status != granted', async ()=> {
      spyOn(Capacitor, 'getPlatform').and.returnValue('android');  
      spyOn(PushNotifications, 'register');
      (PushNotifications.requestPermissions as any)
      .and.returnValue(Promise.resolve({receive: 'denied'}));
      await service.requestPermissions();
      expect(PushNotifications.register).not.toHaveBeenCalled();
    });

    it('If the device is not mobile -> Do not should called requestPermission', async()=> {
      spyOn(Capacitor, 'getPlatform').and.returnValue('web');  
      await service.requestPermissions();
      expect(PushNotifications.requestPermissions).not. toHaveBeenCalled();
    });

  });

  describe('resetPushNotifications', () => {
    beforeEach( () => {
      spyOn(PushNotifications, 'removeAllDeliveredNotifications');
      (PushNotifications.removeAllDeliveredNotifications)
    });

    it('should called removeAllDeliveredNotifications', async ()=> {
      await service.resetPushNotifications();
      expect(PushNotifications.removeAllDeliveredNotifications).toHaveBeenCalledTimes(1);
    });
  });

describe('addListenersForNotifications', () => {

    beforeEach( () => {
      spyOn(PushNotifications, 'addListener');
      (PushNotifications.addListener as any)
      .and.returnValue(Promise.resolve());
      service = TestBed.inject(PushNotificationsService); 
    });

    it('should called addListener', async()=> {
      await service.addListenersForNotifications();
      expect(PushNotifications.addListener).toHaveBeenCalled();
    });

    it('should be defined -> eventListener of registration', ()=> {
      let token:Token= { value: 'qwe123zxc'};
      spyOn(service, 'setToken');
      service.registration(token);
      expect(service.setToken).toHaveBeenCalled();
      //spyOn(PushNotifications,'addListener').withArgs('registration', token)
    });

    it('should be defined -> eventListener of registrationError', ()=> {
      let error:any= { data: 'Error on registration, the notifications will not work'};
      spyOn(console, 'info').and.callThrough();
      service.registrationError(error);
      expect(console.info).toHaveBeenCalledTimes(1)
    });

    it('should be defined -> eventListener of pushNotificationReceived', ()=> {
      let schema:PushNotificationSchema = { id: '123', data: 'Hello World!'};
      spyOn(console, 'info');
      service.pushNotificationReceived(schema);
      expect(console.info).toHaveBeenCalledTimes(1);
      //expect(console.info).toHaveBeenCalledWith("Push received: { id: '123', data: 'Hello World!'}");
    });
    
    it('should be defined -> eventListener of pushNotificationActionPerformed', ()=> {
      let schema:PushNotificationSchema = { id: '456', data: 'Hello World!'};
      let action:ActionPerformed = { actionId: '567', notification: schema};
      spyOn(console, 'info');
      service.pushNotificationActionPerformed(action);
      expect(console.info).toHaveBeenCalledTimes(1);
    });
  });
});
