import { OnInit, Component, Input } from '@angular/core';
import {SoundCloudService} from "./services/soundcloud.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'app';

  @Input()
  private iframeID = "sc-widget";
  constructor(private soundCloudService: SoundCloudService) {
  }

  ngOnInit() {     
    this.soundCloudService.init(this.iframeID);
  }

}
