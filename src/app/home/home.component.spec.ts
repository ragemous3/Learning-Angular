import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpService } from '.././http.service';
import { AuthService } from '.././services/auth.service';

//fixture: Fixture är en wrapper för en komponent och dess template.
//testbed: Simulerar
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpService: HttpService;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [HttpService, AuthService]
    })
    //fixture is a wrapper for component
    fixture = TestBed.createComponent(HomeComponent);
    //one has to get the instance of the component from the fixture
    component = fixture.componentInstance;
    //make the testbed resolve the dependencies using the testbed-injector;
    authService = TestBed.get(AuthService);
    httpService = TestBed.get(HttpService);
    // .compileComponents();
  }));
  it('idk', () => {
    // spyOn(authService, 'isAuthenticated')
  })
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
