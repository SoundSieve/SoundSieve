import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public menu = [];

  loadMenu() {
    return this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  constructor() { }
}
