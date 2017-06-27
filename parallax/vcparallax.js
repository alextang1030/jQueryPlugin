(function($){
  $.fn.vcParallax = function(options){
    var setting = $.extend({
      imgSrc : null,
      height: null,
      width: null,
      xPos: 0,
      yPos: 0,
      speed: 2,
    },options,{
      ele: this,
      obj : null,
    });
    var prevScoll = 0;
    this.initialize = function(){
      if (this.attr("data-image-src")) setting.imgSrc = this.attr("data-image-src");
      if (this.attr("data-height")) setting.height = this.attr("data-height");
      if (this.attr("data-width")) setting.width = this.attr("data-width");

      if (setting.width === null) setting.width = this.outerWidth();
      if (setting.height === null) setting.height = this.outerHeight();
      setting.obj = $("<div>").addClass("vc-parallax-container").append(
        $("<img>").attr("src",setting.imgSrc).addClass("vc-parallax-image")
      )
      .css({
        width:setting.width,
        height:setting.height,
        top:this.offset().top - $(window).scrollTop(),
        left:this.offset().left,
      })
      .insertBefore(this);
      prevScoll = $(window).scrollTop();
      return this;
    };
    this.winScroll = function(){
      var newTop = setting.ele.offset().top - $(window).scrollTop();
      if (prevScoll < $(window).scrollTop())
      {
        // Up
        //setting.obj.children(".vc-parallax-image").css({"margin-top"})
      }
      else {
        //down
      }
      setting.obj.css({
        top: setting.ele.offset().top - $(window).scrollTop()
      });
      prevScoll = $(window).scrollTop();
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
