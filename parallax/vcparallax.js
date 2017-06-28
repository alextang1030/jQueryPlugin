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
			img : null
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

			setting.img = setting.obj.children(".vc-parallax-image");
      if (setting.xPos === null)
				setting.xPos = 0;//(setting.img.width()/2)*-1;
      if (setting.yPos === null)
				setting.yPos = (setting.img.height()/4)*-1;
      setting.img.css({
        top: setting.yPos,
        left: setting.xPos,
      });

      prevScoll = $(window).scrollTop();
      return this;
    };
    this.winScroll = function(){
      var newTop = setting.ele.offset().top - $(window).scrollTop();
      var newScroll = (prevScoll - $(window).scrollTop());
      var img = setting.obj.children(".vc-parallax-image");
			setting.obj.css({
        top: setting.ele.offset().top - $(window).scrollTop()
      });
			var action = false;
			var currentTop = img.offset().top *-1;
			var endTop = setting.xPos + (img.height() - setting.obj.height());

      if (prevScoll < $(window).scrollTop())
      {
        // Scroll down
        newScroll += setting.speed;
				if (currentTop < endTop) action = true;
      }
      else {
        // Scroll up
        newScroll -= setting.speed;
				if (currentTop > setting.yPos) action = true;
      }

      prevScoll = $(window).scrollTop();
			if (action) img.css({"top":"-=" + newScroll});

    }
    this.winResize = function(){
			setting.obj.css({
        top: setting.ele.offset().top - $(window).scrollTop(),
				left: setting.ele.offset().left,
				width: setting.ele.outerWidth(),
				height: setting.ele.outerHeight(),
      });
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
