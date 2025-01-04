import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  emailAddress: string = 'pincarocasion@gmail.com';
  enlaceWeb: string = 'www.pincarocasion.com';

  isSidebarOpen = false;
  screenWidth: number = window.innerWidth;
  isOverlayActive = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isOverlayActive = this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.isOverlayActive = false;
  }

  goBack() {
    this.router.navigate(['..']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.isSidebarOpen = this.screenWidth >= 768;
  }
}
