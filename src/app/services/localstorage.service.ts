import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }



  get() {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('Token');
    }
    return null;
  }

  set(key: string, value: string): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(key, value);
    }
  }

  remove(): void {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.removeItem('Token');

    }
  }
}
