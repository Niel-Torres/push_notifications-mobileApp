import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { PushNotificationsService } from './push-notifications.service';
import { Capacitor } from '@capacitor/core';
import { GlobalProvider } from '@app/providers/global.provider';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('(3) Test of PushNotificationsService', () => {

  let service: PushNotificationsService;
  let globalProvider: GlobalProvider;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach( () => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PushNotificationsService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(PushNotificationsService);
    globalProvider = TestBed.inject(GlobalProvider);
  });

  it('should be created Service PushNotifications', () => {
    expect(service).toBeTruthy();
  });

  describe('Token PushNotification', () => {
    beforeEach( () => {

    });

    it('should be have a function for -> setToken & getToken', ()=> {
      service.setToken('xZas-12345');
      const token = service.getToken();
      expect(service.getToken()).toBe('xZas-12345');
    });

    it('should be have a function for -> saveToken', ()=> {
      const response = {};
      spyOn(globalProvider, 'saveClient').and.returnValue(of(response));
      service.saveToken('/clientes/messages?param');
      expect(globalProvider.saveClient).toHaveBeenCalled();
    });
  });

  describe('requestPermissions', () => {
    beforeEach( () => {
      spyOn(PushNotifications, 'requestPermissions');
      (PushNotifications.requestPermissions as any)
        .and.returnValue(Promise.resolve({receive: 'granted'}));

      service = TestBed.inject(PushNotificationsService);
    });

    it('If the device is mobile -> should called requestPermission and resolve with status = granted', async ()=> {
      spyOn(Capacitor, 'getPlatform').and.returnValue('android');
      spyOn(PushNotifications, 'register');
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

    it('If the device is not mobile -> Do not should called requestPermission', async ()=> {
      spyOn(Capacitor, 'getPlatform').and.returnValue('web');
      await service.requestPermissions();
      expect(PushNotifications.requestPermissions).not. toHaveBeenCalled();
    });

  });

  describe('resetPushNotifications', () => {
    beforeEach( () => {
      spyOn(PushNotifications, 'removeAllDeliveredNotifications');

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

    it('should called addListener', async ()=> {
      await service.addListenersForNotifications();
      expect(PushNotifications.addListener).toHaveBeenCalled();
    });

    it('should be defined -> eventListener of registration', ()=> {
      const token: Token = { value: 'qwe123zxc'};
      spyOn(console, 'log');
      service.registration(token);
      expect(console.log).toHaveBeenCalledTimes(1);
      //spyOn(PushNotifications,'addListener').withArgs('registration', token)
    });

    it('should be defined -> eventListener of registrationError', ()=> {
      const error: any = { data: 'Error on registration, the notifications will not work'};
      spyOn(console, 'log').and.callThrough();
      service.registrationError(error);
      expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should be defined -> eventListener of pushNotificationReceived', ()=> {
      const schema: PushNotificationSchema = { id: '123', data: 'Hello World!'};
      spyOn(console, 'log');
      service.pushNotificationReceived(schema);
      expect(console.log).toHaveBeenCalledTimes(1);
      //expect(console.log).toHaveBeenCalledWith("Push received: { id: '123', data: 'Hello World!'}");
    });

    it('should be defined -> eventListener of pushNotificationActionPerformed', ()=> {
      const schema: PushNotificationSchema = { id: '456', data: 'Hello World!'};
      const action: ActionPerformed = { actionId: '567', notification: schema};
      spyOn(console, 'log');
      service.pushNotificationActionPerformed(action);
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });
});
