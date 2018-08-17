$(document).ready(function(){
    $(document).on("click",".slidemeubtn", function(){
		$("body").addClass("showMobilenav");
	});	
	$(document).on("click",".overlay", function(){
		$("body").removeClass("showMobilenav");
	});
	$('.overlay').bind('touchstart', function(){
		$("body").removeClass("showMobilenav");
	});
	
	
	$(document).on("click",".aside_right_btn", function(){
		$("body").addClass("showaside");
	});	
	$(document).on("click",".overlay", function(){
		$("body").removeClass("showaside");
	});
	$('.overlay').bind('touchstart', function(){
		$("body").removeClass("showaside");
	});

	
		
	$(document).on("click",".shwsearch", function(){
		$(".toglesearch").toggle();
		$("header").toggleClass("nwclose");
	});

	$(document).on("click",".listcatmenu a",function(event){
		event.preventDefault();
		$(this).parent().parent().children().children().removeClass("sl");
		$(this).addClass("sl");
		var tab = $(this).attr("href");
		$(".categoryDesk").css("display", "none");
		$(tab).fadeIn();
	});

	/*$('.mainmenu  ul li a').bind('touchstart', function(){
	$(document).on("click",".mainmenu  ul li a", function(){
		$("body").removeClass("showMobilenav");
	});	
*/
	
	
	
});

// $(document).ready(function () { 

// 	$('.date').datetimepicker({ 
// 	timepicker:false, 
// 	format:'d/m/y' 
// 	}); 
// 	$('.time').datetimepicker({ 
// 	datepicker:false, 
// 	format:'H:i', 
// 	//formatTime:'h:i a', 
// 	}); 
	 
// 	}); 
	
