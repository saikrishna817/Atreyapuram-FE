import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName: string | undefined;
  userEmail: string | undefined;
  private loggedInUserId!: string;


  constructor() { }

  
  setLoggedInUserId(userId: string) {
    this.loggedInUserId = userId;
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }
}
