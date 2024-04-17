import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  SPOTIFY_AUTH = environment.token;

  constructor(private http: HttpClient) { }

  searchMusic(title): Observable<any> {
    const url = 'https://api.spotify.com/v1/search';
    const params = {q: title, type: 'track'};

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.SPOTIFY_AUTH}`);

    return this.http
      .get(url, { headers, params });
  }
}
