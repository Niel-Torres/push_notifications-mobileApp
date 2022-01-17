import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from '../services/push-notifications.service';

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
    this.pushNotifications.requestPermissions();
    this.pushNotifications.addListenersForNotifications();
  }

  generateToken(){
    this.pushNotifications.requestPermissions();
  }

}
