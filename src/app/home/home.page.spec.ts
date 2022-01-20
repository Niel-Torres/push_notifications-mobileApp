import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PushNotificationsService } from '../services/push-notifications.service';
import { HomePage } from './home.page';

describe(`(2) "HomePage"`, () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service: PushNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    service = new PushNotificationsService();
    component = new HomePage(service);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call requestPermissions on ngOnInit', () => {
    const spy = spyOn(service, 'requestPermissions');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });


   it('should call addListenersForNotifications on ngOnInit', () => {
    const spy = spyOn(service, 'addListenersForNotifications');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });


  it('should defined generateToken', () => {
    spyOn(service, 'requestPermissions');
    component.generateToken();
    expect(service.requestPermissions).toHaveBeenCalledTimes(1);
  });

 


});
