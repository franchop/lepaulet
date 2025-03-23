import { ChangeDetectorRef, Component, ElementRef, HostListener, viewChild, ViewChild } from '@angular/core';
import { BacklinkComponent } from '../component/backlink/backlink.component';
import { PhotoService } from '../services/photo.service';
import { CommonModule } from '@angular/common';
import { faArrowUpRightFromSquare, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-photo',
  imports: [BacklinkComponent, CommonModule, FontAwesomeModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  current_picture:any=undefined;
  faArrowUpRightFromSquare=faArrowUpRightFromSquare;
  faNext = faAngleRight;
  faBack = faAngleLeft;
  button_clicked:any = undefined;

  @ViewChild('photo') photoElement!: ElementRef<HTMLElement>

  @HostListener('document:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    if(this.current_picture){
      switch (event.key) {
        case "Escape":
          this.hidePicture();
          break;
        case "ArrowLeft":
          this.previous();
          break;
        case "ArrowRight":
          this.next();
          break;
        default:
          break;
      }
    }
  }
    
  constructor(private cdr: ChangeDetectorRef,public photoService: PhotoService) {}
  
  ngOnInit() {
    this.photoService.getPictures();
  }
  previous(){
    let nextIndex = (this.photoService.pictures.indexOf(this.current_picture) - 1);
    nextIndex = nextIndex >= 0 ? nextIndex:this.photoService.pictures.length - 1;
    this.current_picture = this.photoService.pictures[nextIndex];
    this.updateButton(this.current_picture);
    this.focus();
  }
  next(){
    let nextIndex = (this.photoService.pictures.indexOf(this.current_picture) + 1) % this.photoService.pictures.length;
    this.current_picture = this.photoService.pictures[nextIndex];
    this.updateButton(this.current_picture);
    this.focus();
  }
  showPicture(picture:any, button:any){
    this.current_picture = picture;
    this.button_clicked=button;
    this.focus();
  }
  updateButton(picture:any){
    this.button_clicked = document.querySelector("img[src='/photos/"+picture.name_thumbnail+"']")?.closest('button');
  }
  focus(){
    this.cdr.detectChanges();
    this.photoElement?.nativeElement.focus();
  }
  hidePicture(){
    this.current_picture = undefined;
    if(this.button_clicked)this.button_clicked.focus();
  }
}
