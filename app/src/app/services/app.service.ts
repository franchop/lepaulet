import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private sanitizer: DomSanitizer) { }

  
  sanitize(iframe:string){
    return iframe && iframe.length > 0 ? this.sanitizer.bypassSecurityTrustHtml(iframe):'';
  }
}
