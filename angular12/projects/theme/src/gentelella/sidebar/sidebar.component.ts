import {AfterViewInit, Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  private currentModule: any;
  private $BODY: any;
  private $MENU_TOGGLE: any;
  private $SIDEBAR_MENU: any;
  private $SIDEBAR_FOOTER: any;
  private $LEFT_COL: any;
  private $RIGHT_COL: any;
  private $NAV_MENU: any;
  private $FOOTER: any;

  constructor() {
    this.currentModule = 'dashboard';
  }

  ngAfterViewInit(): void {
    this.$BODY = $('body');
    this.$MENU_TOGGLE = $('#menu_toggle');
    this.$SIDEBAR_MENU = $('#sidebar-menu');
    this.$SIDEBAR_FOOTER = $('.sidebar-footer');
    this.$LEFT_COL = $('.left_col');
    this.$RIGHT_COL = $('.right_col');
    this.$NAV_MENU = $('.nav_menu');
    this.$FOOTER = $('footer');
  }

  anchorClicked($event: MouseEvent): void {
    // let target = $event.srcElement?.id;
    //
    // let $li = $('#' + target.replace('chevron', 'li')).parent();
    //
    // if ($li.is('.active')) {
    //   $li.removeClass('active active-sm');
    //   $('ul:first', $li).slideUp(function () {
    //   });
    // } else {
    //   // prevent closing menu if we are on child menu
    //   if (!$li.parent().is('.child_menu')) {
    //     $('#sidebar-menu')
    //       .find('li')
    //       .removeClass('active active-sm');
    //     $('#sidebar-menu')
    //       .find('li ul')
    //       .slideUp();
    //   }
    //
    //   $li.addClass('active');
    //
    //   $('ul:first', $li).slideDown(function () {
    //   });
    // }
  }

  plot(): void {
    console.log('in sidebar');

    let $a = this.$SIDEBAR_MENU.find('a');
    this.$SIDEBAR_MENU.find('a').on('click', (ev: any) => {
      let $li = $(this).parent();

      if ($li.is('.active')) {
        $li.removeClass('active active-sm');
        $('ul:first', $li).slideUp(() => {
          this.setContentHeight();
        });
      } else {
        // prevent closing menu if we are on child menu
        if (!$li.parent().is('.child_menu')) {
          this.$SIDEBAR_MENU.find('li').removeClass('active active-sm');
          this.$SIDEBAR_MENU.find('li ul').slideUp();
        }

        $li.addClass('active');

        $('ul:first', $li).slideDown(() => {
          this.setContentHeight();
        });
      }
    });

    // toggle small or large menu
    this.$MENU_TOGGLE.on('click', () => {
      if (this.$BODY.hasClass('nav-md')) {
        this.$SIDEBAR_MENU.find('li.active ul').hide();
        this.$SIDEBAR_MENU
          .find('li.active')
          .addClass('active-sm')
          .removeClass('active');
      } else {
        this.$SIDEBAR_MENU.find('li.active-sm ul').show();
        this.$SIDEBAR_MENU
          .find('li.active-sm')
          .addClass('active')
          .removeClass('active-sm');
      }

      this.$BODY.toggleClass('nav-md nav-sm');

      this.setContentHeight();
    });
  }

  onMenuClick($event: MouseEvent): void {
    console.log($event);
    const aElement = $event.target as HTMLAnchorElement;
    const $li = $(aElement).parent();

    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(() => {
        this.setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        this.openUpMenu();
      } else {
        if (this.$BODY.is('nav-sm')) {
          if (!$li.parent().is('child_menu')) {
            this.openUpMenu();
          }
        }
      }

      $li.addClass('active');

      $('ul:first', $li).slideDown(() => {
        this.setContentHeight();
      });
    }
  }

  setContentHeight(): void {
    // reset height
    this.$RIGHT_COL.css('min-height', $(window).height());

    const bodyHeight = this.$BODY.outerHeight();
    const footerHeight = this.$BODY.hasClass('footer_fixed') ? -10 : this.$FOOTER.height();
    const leftColHeight = this.$LEFT_COL.eq(1).height() + this.$SIDEBAR_FOOTER.height();
    let contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= this.$NAV_MENU.height() + footerHeight;

    this.$RIGHT_COL.css('min-height', contentHeight);
  };

  openUpMenu(): void {
    this.$SIDEBAR_MENU.find('li').removeClass('active active-sm');
    this.$SIDEBAR_MENU.find('li ul').slideUp();
  }
}
