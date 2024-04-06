import { Component } from '@angular/core';
import { Directive, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  constructor(private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const screenWidth = window.innerWidth;
    const isMobileScreen = screenWidth <= 767; // Assuming 767px is the breakpoint for mobile screens
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (isMobileScreen && navbarCollapse?.classList.contains('show')) {
      this.renderer.removeClass(navbarCollapse, 'show');
    }
  }
}
