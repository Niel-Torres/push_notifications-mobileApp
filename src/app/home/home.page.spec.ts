import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PushNotificationsService } from '../services/push-notifications.service';
import { HomePage } from './home.page';
import { GlobalProvider } from '@app/providers/global.provider';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe(`(2) "HomePage"`, () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service: PushNotificationsService;
  let globalProvider: GlobalProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    service = new PushNotificationsService(globalProvider);
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
