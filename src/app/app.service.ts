import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  doSomething(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Access window object here
      console.log(window);
    }
  }

}
