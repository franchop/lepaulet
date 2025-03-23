import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MusicService } from '../services/music.service';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { AlbumComponent } from '../component/album/album.component';
import { BacklinkComponent } from '../component/backlink/backlink.component';

@Component({
  selector: 'app-music',
  imports: [RouterModule,CommonModule,FontAwesomeModule, AlbumComponent, BacklinkComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
})
export class MusicComponent {
  faInstagram=faInstagram;
  albums$!: Observable<any[]>;
  album:any = null;

  constructor(private musicService: MusicService) {}
  
  ngOnInit() {
    this.albums$ = this.musicService.getAlbums();
    this.albums$.subscribe(albums => {
      if (albums && albums.length > 0) {
        this.album = albums[0]; 
      }
    });
  }

}
