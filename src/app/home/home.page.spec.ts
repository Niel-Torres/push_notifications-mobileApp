import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';
import { PushNotificationsService } from '../services/push-notifications.service';
import { HomePage } from './home.page';

describe(`(2) "HomePage"`, () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service: PushNotificationsService;
  let platform: Platform;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    service = new PushNotificationsService();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call initializePushNotifications on ngOnInit', () => {
    const spy = spyOn(component, 'initializePushNotifications');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

});
