import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  show: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.show = true;
    }, 100);
  }
}
