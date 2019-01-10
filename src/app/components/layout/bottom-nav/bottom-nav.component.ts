import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  prevScrollpos;
  prevPos;
  previousTime; // speed between scrolls

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {

    this.prevScrollpos = window.pageYOffset;
    let delta = 99999;
    let diff = 0;
    let speed = 0;


    // If you want this captured the TypeScript way of doing this is via arrow functions. 
    // The this in arrow functions is lexically scoped
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      const currentTime = new Date().getMilliseconds();

      if (this.previousTime) {
        delta = currentTime - this.previousTime;
        diff = currentScrollPos - this.prevScrollpos;
        speed = Math.abs(diff / delta);
      }

      // If scroll speed is larger than threshold or user scrolled back to top
      if (speed > 1 || currentScrollPos === 0) {
        if (this.prevScrollpos > currentScrollPos) {
          document.getElementById('footer-toolbar').style.bottom = '0';
        } else {
          document.getElementById('footer-toolbar').style.bottom = '-48px';
        }
      }
      this.prevScrollpos = currentScrollPos;
      this.previousTime = currentTime;
    };
  }

  clear() {
    console.log('asd');
  }

}
