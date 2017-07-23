import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import {SoundCloudService} from "./services/soundcloud.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StoreService, SoundCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
