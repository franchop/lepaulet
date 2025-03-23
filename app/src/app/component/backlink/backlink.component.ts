import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-backlink',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './backlink.component.html',
  styleUrl: './backlink.component.scss'
})
export class BacklinkComponent {
  faBack = faAngleLeft;
  @Input({required:true}) title:string = "";
}
