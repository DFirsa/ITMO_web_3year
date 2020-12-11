jQuery(window).scroll(function(){

    var $sections = $('section');
    $sections.each(function(i,el){
        var top  = $(el).offset().top-100;
        var bottom = top +$(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');

        if(id == "projects"){ bottom = bottom - 1250}
        if( scroll > top && scroll < bottom){
            $('.header_items a.link-active').removeClass('link-active');
            $('a[href="#'+id+'"]').addClass('link-active');
        }
    });

    if(pageYOffset > $('#skills').offset().top - 100){
        $('#skills > div > div:nth-child(3) > div:nth-child(1) > div > div').addClass('java');
        $('#skills > div > div:nth-child(3) > div:nth-child(2) > div > div').addClass('c');
        $('#skills > div > div:nth-child(3) > div:nth-child(3) > div > div').addClass('sql');
        $('#skills > div > div:nth-child(3) > div:nth-child(4) > div > div').addClass('web');
        $('#skills > div > div:nth-child(5) > div:nth-child(1) > div > div').addClass('russian');
        $('#skills > div > div:nth-child(5) > div:nth-child(2) > div > div').addClass('english');

        $("#skills > div > div:nth-child(4) > div:nth-child(1) > div > div").addClass('java');
        $("#skills > div > div:nth-child(4) > div:nth-child(2) > div > div").addClass('c');
        $("#skills > div > div:nth-child(4) > div:nth-child(3) > div > div").addClass('sql');
        $("#skills > div > div:nth-child(4) > div:nth-child(4) > div > div").addClass('web');
        $("#skills > div > div:nth-child(7) > div:nth-child(1) > div > div").addClass('russian');
        $("#skills > div > div:nth-child(7) > div:nth-child(2) > div > div").addClass('english');
    }
});

$(".header_items").on("click","a", function (event) {
   event.preventDefault();

   var id  = $(this).attr('href'),
       top = $(id).offset().top;
    
   $('body,html').animate({scrollTop: top}, 800);
});

$(".leng_link:nth-child(1)").click(function(){
    $(".leng_link:nth-child(2)").removeClass("link-active");
    $(this).addClass("link-active");
    $(".eng").css("display", "none");
    $(".ru").css("display", "block");
    $("body > header > div > nav > ul.header_items.ru").css("display", "flex");
});

$(".leng_link:nth-child(2)").click(function(){
    $(".leng_link:nth-child(1)").removeClass("link-active");
    $(this).addClass("link-active");
    $(".ru").css("display", "none");
    $(".eng").css("display", "block");
    $("body > header > div > nav > ul.header_items.eng").css("display", "flex");
});