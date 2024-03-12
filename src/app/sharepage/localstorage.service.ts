import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  getItem(key: any) {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);
      return data;
    }
    return null; // or handle differently for server-side rendering
  }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  remove() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

}
