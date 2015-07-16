     


/**
 * 消息滚动插件
 * 
 * jquery.messageScroll.js    v0.1.0     date   2015-3-20
 * @author zhengchj
 * @mail zhengchj@neusoft.com
 * 控件初始化
 * $(selector).messageScroll({
 *     delay:               //滚动间隔时间                    默认50ms
 * 	   mouseOverStop:       //鼠标放上去是否停止滚动           默认true
 * 	   direction:           //滚动方向  up or down            默认up     //TODO   这个功能还没做
 * 	   messageArea:         //消息存放区域                    必填
 * })
 * 
 * 
 * 
 * update                    v0.1.1   date  2015-4-5
 * @author zhengchj
 * 
 * 1.    clone dom树时把事件也复制。 
 * 2.    当没有messageArea参数时直接return
 * 
 * 
 * 
 * 
 * 
 */


(function($){
	$.fn.messageScroll=function(option){
		var settings=$.extend({
			delay:50,
			mouseOverStop:true,
			direction:"up",//up or down,
			messageArea:""//
		},option);
		if(settings.messageArea==null||settings.messageArea=="")    //v0.1.1
			return this;
		settings.$this=this;
		$(settings.messageArea).css("margin",0);
		$(settings.messageArea).next().remove();
		$(settings.$this).append($(settings.messageArea).clone(true));   //v0.1.1
		$(settings.messageArea).next().attr("id","scroll_clone");
		$(settings.$this).scrollTop(0).css("overflow","hidden");
		function scrollUp(){
			if($(settings.$this).scrollTop()>=$(settings.messageArea).outerHeight(true)){
				$(settings.$this).scrollTop(0);
			}else{
				var currentScrollTop=$(settings.$this).scrollTop();
				$(settings.$this).scrollTop(currentScrollTop+1);
			}
		}
		var scrollUpInterval=setInterval(scrollUp,settings.delay);
		if(settings.mouseOverStop){
			$(settings.$this).bind({
				mouseover:function(){
					clearInterval(scrollUpInterval);
				},
				mouseout:function(){
					scrollUpInterval=setInterval(scrollUp,settings.delay);
				}
			})
		}
		return this;
		
	}
})(jQuery);