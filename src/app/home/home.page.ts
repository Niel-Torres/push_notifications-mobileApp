import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from '../services/push-notifications.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private pushNotifications: PushNotificationsService
  ) {}

  ngOnInit(){
    console.log('Home ngOnInit');
    if (Capacitor.getPlatform() !== 'web') {
      this.pushNotifications.requestPermissions();
      this.pushNotifications.addListenersForNotifications();
    }
  }

  generateToken(){
    this.pushNotifications.requestPermissions();
  }

  generateTopicToNotifications(topic: any) {
    console.log('Topic generated: '+topic.value);
    this.pushNotifications.createSubcriptionByTopic(topic.value);
  }

}
