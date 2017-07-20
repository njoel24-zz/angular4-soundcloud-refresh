import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  

  constructor() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../../sw.js');
    }
    
  }
}
