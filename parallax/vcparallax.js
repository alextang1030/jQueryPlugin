(function($){
  $.fn.vcParallax = function(options){
    var setting = $.extend({
      ele: this,
      obj : null,
      imgSrc : null,
      height: null,
      width: null
    },options);

    this.initialize = function(){
      if (this.attr("data-image-src")) setting.imgSrc = this.attr("data-image-src");
      if (this.attr("data-height")) setting.height = this.attr("data-height");
      if (this.attr("data-width")) setting.width = this.attr("data-width");

      if (setting.width === null) setting.width = this.outerWidth();
      if (setting.height === null) setting.height = this.outerHeight();
      return this;
    };

    this.winResize = function(){

		}
		$(window).resize(function(){
			setting.ele.winResize();
		});
		return this.initialize();
  };
})(jQuery)
