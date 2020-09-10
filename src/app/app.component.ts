import {AfterViewInit, Component, DoCheck, HostListener, OnChanges, OnInit} from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cocktail DB';
  isCollapsed = true;
  mobVersion = false
  selectedCatLength: number

  ngOnInit() {
    this.mobVersion = this.isCollapsed = window.innerWidth < 768
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    (event.target.innerWidth < 768) ? this.mobVersion = this.isCollapsed = true : this.mobVersion = this.isCollapsed = false
  }

  onFiltersApplied(length: number) {
    if (this.mobVersion) {
      this.isCollapsed = !this.isCollapsed
    }
    this.selectedCatLength = length
  }
}
