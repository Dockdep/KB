import { SinglePageAppPage } from './app.po';

describe('single-page-app App', () => {
  let page: SinglePageAppPage;

  beforeEach(() => {
    page = new SinglePageAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
