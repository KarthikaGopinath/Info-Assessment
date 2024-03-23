import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infocusp';
  subTitle = 'Todo App';
  darkMode : boolean = false;

  constructor() {

  }

  ngOnInit() {
    if(window.location.pathname.includes('currency')) {
      this.subTitle = "Currency Converter";
      document.getElementById('currencyConverter')?.classList.add('focus-nav');
    } else {
      this.subTitle = "Todo App";
      document.getElementById('todo')?.classList.add('focus-nav');
    }
    if(localStorage.getItem('darkItem') == "true") {
      this.darkMode = true;
      document.body.classList.toggle('dark-theme');
    }
  }

  changeOption(subTitle : string) {
    this.subTitle = subTitle;
    var titleId = subTitle.includes('Todo') ? "currencyConverter" : "todo";
    document.getElementById(titleId)?.classList.remove('focus-nav');
  }

  changeColorTheme() {
    this.darkMode = !this.darkMode;
    if(this.darkMode) {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('darkItem', "true");
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('darkItem', "false");
    }
  }
}
