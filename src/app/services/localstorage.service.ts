import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get(): string | null {
    const isBrowser = this.isBrowser();
    if (isBrowser) {
      return localStorage.getItem('Token');
    } else {
      return null;
    }
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
