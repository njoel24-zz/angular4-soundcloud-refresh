export interface IWindowSCExtended extends Window {
    SC: any;
}

declare var window: IWindowSCExtended;
export class SoundCloudService {
    constructor (){
        window.SC.initialize({
            client_id: 'R8hcCJGygGAJVJT3Y1lz6COQDgNkSooK',
            redirect_uri: 'http://looptube.net/sooundcloud/build/callback.html'
        });
    }

    init(iframeID: string) {
        const widgetFrame: any = document.getElementById(iframeID);
        widgetFrame.src = this.getNewSound();
        const widget= window.SC.Widget(widgetFrame);
        widget.bind(window.SC.Widget.Events.READY, () => {
            widget.bind(window.SC.Widget.Events.FINISH, () => {
                window.location.reload();
            });
        });
        widget.bind(window.SC.Widget.Events.ERROR, () => {
                window.location.reload();
            });
    }

   private getNewSound(): string  {
    const random = Math.floor((Math.random() * 10000000) + 1);
    return "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/"+random+"&show_artwork=true";
  }
}