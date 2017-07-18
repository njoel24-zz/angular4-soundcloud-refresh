import { SoundcloudwvPage } from './app.po';

describe('soundcloudwv App', () => {
  let page: SoundcloudwvPage;

  beforeEach(() => {
    page = new SoundcloudwvPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
