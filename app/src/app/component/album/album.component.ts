import { Component, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { faSpotify, faDeezer, faItunes, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album',
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {
  @Input() album:any={};
  faSpotify = faSpotify;
  faDeezer=faDeezer;
  faItunes=faItunes;
  faYoutube=faYoutube;
  player:string="spotify"

    constructor(public appService: AppService){}
}
