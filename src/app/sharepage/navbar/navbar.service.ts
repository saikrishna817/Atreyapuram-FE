import { Injectable } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName: string | undefined;
  userEmail: string | undefined;
  userId: any;
  userPassword:any;
  private NavigationEnd!: string;
  private readonly storageKey = 'loggedInUser';

  constructor(
    private localStorage: LocalstorageService
  ) {
    // Check if user details are stored in localStorage
    const userDetails = this.localStorage.getItem('userDetails');
    if (userDetails) {
      const { name, email, id, password } = JSON.parse(userDetails);
      this.userName = name;
      this.userEmail = email;
      this.userId = id;
      this.userPassword = password
    }
  }

  // setLoggedInUserId(userId: string) {
  //   this.loggedInUserId = userId;
  // }
  // getLoggedInUserId() {
  //   return this.loggedInUserId;
  // }
  setLoggedInUserDetails(userName: string, userEmail: string, userId: number, userPassword: any) {
    if (this.isLocalStorageAvailable()) {
      const userDetails = { userName, userEmail, userId, userPassword };
      localStorage.setItem(this.storageKey, JSON.stringify(userDetails));
    }
  }

  getLoggedInUserName() {
    if (this.isLocalStorageAvailable()) {
      const userDetailsString = localStorage.getItem(this.storageKey);
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        return userDetails.userName;
      }
    }
    return '';
  }
  getLoggedInUserEmail() {
    if (this.isLocalStorageAvailable()) {
      const userDetailsString = localStorage.getItem(this.storageKey);
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        return userDetails.userEmail;
      }
    }
    return '';
  }

  getLoggedInUserId() {
    if (this.isLocalStorageAvailable()) {
      const userDetailsString = localStorage.getItem(this.storageKey);
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        return userDetails.userId;
      }
    }
    return '';
  }

  getLoggedInUserPassword() {
    if (this.isLocalStorageAvailable()) {
      const userDetailsString = localStorage.getItem(this.storageKey);
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        return userDetails.userPassword;
      }
    }
    return '';
  }

  clearLoggedInUserDetails() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__testKey__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

}
