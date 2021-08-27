import {Component} from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent {

  constructor() {
  }

  toggleClicked(event: MouseEvent) {
    const body = $('body');
    const menu = $('#sidebar-menu');

    // toggle small or large menu
    if (body.hasClass('nav-md')) {
      menu.find('li.active ul').hide();
      menu
        .find('li.active')
        .addClass('active-sm')
        .removeClass('active');
    } else {
      menu.find('li.active-sm ul').show();
      menu
        .find('li.active-sm')
        .addClass('active')
        .removeClass('active-sm');
    }
    body.toggleClass('nav-md nav-sm');
  }
}
