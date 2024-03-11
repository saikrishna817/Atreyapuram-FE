import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  private openLoginModalSubject = new Subject<void>();

  openLoginModal$ = this.openLoginModalSubject.asObservable();

  openLoginModal() {
    this.openLoginModalSubject.next();
  }
}
