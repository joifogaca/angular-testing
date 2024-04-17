import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {
  value = '';

  errorMessage = '';

  tracks;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  clear() {
    this.value = '';
    this.errorMessage = '';
    this.tracks = [];
  }
  clickAction() {

    this.spotifyService.searchMusic(this.value).subscribe(
      (response) => {
        console.log(response);
        this.tracks = response.tracks.items;
        this.errorMessage = '';
      },

      errorResponse => {
        this.errorMessage = errorResponse.message;
      }
    );
  }

}
