import { ComponentFixture, TestBed, getTestBed, waitForAsync } from '@angular/core/testing';
import { TrackItemComponent } from './track-item.component';
import { Router, Routes, provideRouter } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

const routes: Routes = [
  { path: 'teste', component: TrackItemComponent },
];

describe('TrackItemComponent', () => {
  let component: TrackItemComponent;
  let fixture: ComponentFixture<TrackItemComponent>;
  let router: Router;
  let injector: TestBed;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackItemComponent,
        AppComponent
       ],
       // RouterTestingModule.withRoutes(routes)
       providers: [ provideRouter([{path: 'teste', component: AppComponent}])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(TrackItemComponent);
    component = fixture.componentInstance;
    //router = injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit(`Dado um track-item
      Quando for clicado
      Deve redirecionar pra rota 'teste'`,async () => {
    spyOn(router, 'navigate');

    const trackItem = fixture.nativeElement.querySelector('.track-item');

    await trackItem.click();

    expect(TestBed.inject(Router).url).toEqual('/');
  });
});
