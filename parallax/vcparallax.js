(function($){
  $.fn.vcParallax = function(options){
    var setting = $.extend({
      imgSrc : null,
      height: null,
      width: null,
      xPos: null,
      yPos: null,
      speed: 2,
    },options,{
      id: "vcpa"+$.now(),
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
      setting.obj = $("<div>").addClass("vc-parallax-container")
        .attr("id",setting.id)
        .append(
          $("<img>").attr("src",setting.imgSrc).addClass("vc-parallax-image")
        )
        .css({
          width:setting.width,
          height:setting.height,
          top:this.offset().top - $(window).scrollTop(),
          left:this.offset().left,
        });

      setting.obj.insertBefore(this);
      if (setting.xPos === null) setting.xPos = (setting.obj.children(".vc-parallax-image").width()/2)*-1;
      if (setting.yPos === null) setting.yPos = (setting.obj.children(".vc-parallax-image").height()/2)*-1;
      setting.obj.children(".vc-parallax-image").css({
        top: setting.xPos,
        left: setting.yPos,
      });

      prevScoll = $(window).scrollTop();
      return this;
    };
    this.winScroll = function(){
      var newTop = setting.ele.offset().top - $(window).scrollTop();
      var newScroll = (prevScoll - $(window).scrollTop());
      var img = setting.obj.children(".vc-parallax-image");
      if (prevScoll < $(window).scrollTop())
      {
        // Scroll down
        newScroll += setting.speed;
        // if (img.offset().top >= (img.height() - setting.obj.height())) newScroll = 0;
      }
      else {
        // Scroll up
        newScroll -= setting.speed;
        // if (img.offset().top <= 0) newScroll = 0;
      }
      img.css({"top":"-=" + newScroll});
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
