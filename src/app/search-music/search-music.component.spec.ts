import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed, getTestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { Observable, of, throwError } from 'rxjs';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { TrackItemComponent } from '../track-item/track-item.component';
import { SearchMusicComponent } from './search-music.component';

/**
// mockando componente sem MockComponent
@Component({
  // usar mesmo seletor
  selector: 'app-track-item',
  template: '',
})
class MockTrackItemComponent {
  @Input() trackName = '';
}*/

class MockSpotifyService {
  searchMusic(): Observable<any> { return null; }
}

describe('SearchMusicComponent', () => {
  let injector: TestBed;
  let component: SearchMusicComponent;
  let fixture: ComponentFixture<SearchMusicComponent>;
  let spotifyService: SpotifyService;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [MatInputModule, MatFormFieldModule, MatIconModule,
        FormsModule, BrowserAnimationsModule],
      //MockTrackItemComponent],
      //declarations: [SearchMusicComponent, MockComponent(TrackItemComponent)],
      declarations: [SearchMusicComponent, TrackItemComponent],
      providers: [
        { provide: SpotifyService, useClass: MockSpotifyService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(SearchMusicComponent);
    component = fixture.componentInstance;
    spotifyService = injector.get(SpotifyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado a pesquisa
      Quando for executada com sucesso
      Deve retornar os nomes das musicas`, () => {

    const mockResponse = {
      tracks: {
        items: [
          { name: 'Track Name' }
        ]
      }
    };

    const searchMusic = spyOn(spotifyService, 'searchMusic')
    .and.returnValue(of( mockResponse ));

    const button = fixture.nativeElement.querySelector('#btn-buscar');
    component.value = 'Gorillaz';

    button.click();
    fixture.detectChanges();

   // const trackItem = fixture.nativeElement.querySelector('.trackName');

    expect(spotifyService.searchMusic).toHaveBeenCalledTimes(1);
    expect(spotifyService.searchMusic).toHaveBeenCalledWith("Gorillaz");
    expect(component.tracks).toBe(mockResponse.tracks.items);
  });

  it(`Dado a pesquisa
      Quando for executada com erro
      Deve retornar uma mensagem de erro`, () => {
    const errorResponse = {
      status: 400,
      message: 'Falha ao realizar chamada'
    };

    const button = fixture.nativeElement.querySelector('#btn-buscar');

    spyOn(spotifyService, 'searchMusic').and.returnValue(throwError(errorResponse));
    button.click();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.error');
    expect(spotifyService.searchMusic).toHaveBeenCalledTimes(1);
    expect(error.textContent).toContain(errorResponse.message);
  });
});
