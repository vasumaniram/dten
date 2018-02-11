import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for DtenApp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be DtenApp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('DtenApp');
    })
  });

  it('navbar-brand should be dten@0.2.0-20180102082548',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('dten@0.2.0-20180102082548');
  });

  
    it('Tender component should be loadable',() => {
      page.navigateTo('/Tender');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Tender');
    });

    it('Tender table should have 7 columns',() => {
      page.navigateTo('/Tender');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  
    it('TenderListing component should be loadable',() => {
      page.navigateTo('/TenderListing');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('TenderListing');
    });

    it('TenderListing table should have 7 columns',() => {
      page.navigateTo('/TenderListing');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
