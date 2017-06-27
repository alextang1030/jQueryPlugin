(function($){
  $.fn.vcParallax = function(options){
    var setting = $.extend({
      imgSrc : null,
      height: null,
      width: null,
      xPos: 0,
      yPos: 0
    },options,{
      ele: this,
      obj : null,
    });

    this.initialize = function(){
      if (this.attr("data-image-src")) setting.imgSrc = this.attr("data-image-src");
      if (this.attr("data-height")) setting.height = this.attr("data-height");
      if (this.attr("data-width")) setting.width = this.attr("data-width");

      if (setting.width === null) setting.width = this.outerWidth();
      if (setting.height === null) setting.height = this.outerHeight();
      return this;
    };
    this.winScroll = function(){

    }
    this.winResize = function(){

		}
    $(window).scroll(function(){
      setting.ele.winScroll();
    });
		$(window).resize(function(){
			setting.ele.winResize();
		});
		return this.initialize();
  };
})(jQuery)
