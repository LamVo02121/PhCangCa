import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  // collapsed = true;
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  public toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  public closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
