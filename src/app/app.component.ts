import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, of, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { TranslateService } from './translations/translate.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class AppComponent implements OnInit {
  title = 'template';
  online$: Observable<boolean>;
  public supportedLanguages: any[];

  constructor(private _translate: TranslateService) {
    // If user is offline
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
  }

  ngOnInit() {
    // standing data
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Español', value: 'es' },
      // { display: '华语', value: 'zh' },
    ];

    // TODO read the user's browser language navigator.language and set default language accordingly.
    this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    // set current lang;
    this._translate.use(lang);
  }

}
