/********* --- Rich Banner Text --- *********/
class RichBannerTextSection extends BTSection {
  onInit() {
    const effect = BT.data.cacheWindowWidth < BT.options.windowScreen.desktop ? false : true;
    if(!Shopify.designMode) {
      const timeout = BT.data.cacheWindowWidth < BT.options.windowScreen.desktop ? 2300 : 0;
      setTimeout(() => {
        this.runSliderBanner(effect);
      }, timeout);
    } else {
      this.runSliderBanner(effect);
    }
    BT.applyCustomColorSwatches(this.container);
    BT.initDealCountdown(this.container);
    BT.popularAddedWishlistItems(this.container);
    
    this.slider = this.container.find(BT.getSliderSelector());
  }

  runSliderBanner(effect) {
    this.container.find('.zoom-fade.lazyloaded').addClass('ignore-effect');
    BT.initSlider(this.container, true, effect);
  }
}
theme.sections.constructors['rich-banner-text'] = RichBannerTextSection;