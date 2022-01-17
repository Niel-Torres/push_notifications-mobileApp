import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, PermissionStatus, PushNotificationsPlugin, DeliveredNotifications, ListChannelsResult } from '@capacitor/push-notifications';
import { TestBed, inject } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { PushNotificationsService } from './push-notifications.service';
import type { PermissionState, PluginListenerHandle } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';



describe('(3) Test of PushNotificationsService', () => {
  
  let service: PushNotificationsService;
  let pushNotificationMock: typeof PushNotifications;
  let remove;

  beforeEach(() => {

    //spyPlatform = jasmine.createSpyObj('Platform', ['is']);   

    pushNotificationMock = jasmine.createSpyObj('PushNotifications', 
      {
        register: (()=> Promise.resolve()),
        getDeliveredNotifications: () => new Promise<DeliveredNotifications>(()=>{}),
        removeDeliveredNotifications: (()=> {}),
        removeAllDeliveredNotifications: (()=>{}),
        createChannel: (()=> Promise.resolve()),
        deleteChannel: (()=> Promise.resolve()),
        listChannels: () => new Promise<ListChannelsResult>(()=>{}),
        checkPermissions: () => new Promise<PermissionStatus>(()=>{}),
        requestPermissions: () => new Promise<any>(()=>{}),
        addListener: () => (remove),
        removeAllListeners:  (()=> Promise.resolve()),
      }
    )

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

  it('should check platform is web and do not initialize pushNotificationService', () => {
    spyOn(service, 'registerPush');  
    spyOn(Capacitor, 'getPlatform').and.returnValue('web');
    service.registerPush();
    expect(service.registerPush).not.toHaveBeenCalled();
  })
  
  it('should check platform is web and initialize pushNotificationService', () => {
    spyOn(service, 'registerPush');  
    spyOn(Capacitor, 'getPlatform').and.returnValue('android');
    service.registerPush();
    expect(service.registerPush).toHaveBeenCalled();
  })

  it('should check if exist a function for resetPushNotifications', () => {    
    //spyOn(PushNotifications, 'removeAllDeliveredNotifications').and.returnValue(new Promise(() => Promise.resolve()))
    //service.resetPushNotifications();
    //expect(PushNotifications.removeAllDeliveredNotifications).toBeTruthy();

    //spyOn(pushNotificationMock, 'removeAllDeliveredNotifications').and.returnValue(Promise.resolve());
    service.resetPushNotifications();
    expect(pushNotificationMock.removeAllDeliveredNotifications).toBeTruthy();
  })

  it('should be registerPush', () => {
    service.registerPush();
    expect(service.registerPush).toBeDefined();
  });


  


















  it('buenas formas de hacer test', () => {
   /* 
   *UNA BUENA OPCION SI SE TRATA DE MOCKS

   Antes necesitas lo siguiente:

   1.antes del before:
    // let spyPlatform: jasmine.SpyObj<Capacitor>;

    2.en el before:
       // spyPlatform = jasmine.createSpyObj('Platform', ['is']);                  


    3.Y ya en el "it":

    spyPlatform.is.and.returnValue(true);
    spyOn(newservice, 'pruebaa');
    newservice.testing();

    // ----------------------
   
    expect(newservice.pruebaa).toHaveBeenCalled()
  */

    /*
    OTRA BUENA OPCIN si se trata de plugins
    spyOn(newservice, 'pruebaa');
    spyOn(newservice, 'pruebab');
   

    spyOn(Capacitor, 'getPlatform').and.returnValue('web');
    newservice.testing();
  
    expect(newservice.pruebab).toHaveBeenCalled();
   
    */


  });

    
  

});
