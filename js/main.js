$(document).ready(function(){
    if($('.home-page').length > 0){
        let goTopBtn = $('#goTop');
        let homeOffset = Math.ceil($('#home').offset().top);

        // Navbar chnage backgroundColor & padding on scroll 
        $(window).scroll(function (){
            let windowScroll = Math.ceil($(window).scrollTop());
            
            if(windowScroll >= 50){
                $('nav').css({
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: '15px 0'
                });
            }
            else{
                $('nav').css({
                    backgroundColor: 'transparent',
                    padding: '30px 0'
                });
            }
        });

        // Add active class to links on click
        $('.list-link').click(function(){
            let sectionHref = $(this).attr('href');
            let sectionOffset = $(sectionHref).offset().top;

           $('body, html').animate({
               scrollTop: sectionOffset - 50
           }, 1500);

            $(this).addClass('active');
            $(this).parent().siblings().children().removeClass('active')
            
        });

        // Add active class to links on scroll
        $(window).scroll(function () {
            let windowScroll = Math.ceil($(window).scrollTop());
            let links = $('.list-link');
            
            for(let link of links){
                let sectionHref = $(link).attr('href');
                let sectionOffset = Math.ceil($(sectionHref).offset().top);
                if(windowScroll >= sectionOffset - 100){
                    $(link).addClass('active');
                    $(link).parent().siblings().children().removeClass('active')
                }
            }
        })

        // Show go up button on scroll
        $(window).scroll(function(){
            let windowScroll = Math.ceil($(window).scrollTop());
            let homeHeight = $('#home').height();

            if(windowScroll >= homeHeight - 100){
                $(goTopBtn).css('opacity', '1');
            }else{
                $(goTopBtn).css('opacity', '0');
                
            }
        });

        // go to top on click on go up button
        $(goTopBtn).click(() => {
            $('body, html').animate({
                scrollTop: homeOffset
            }, 1500);
        });

        // Progress Bar
        $(window).scroll(() => {
            let windowScroll = Math.ceil($(window).scrollTop());
            let aboutOffset = Math.ceil($('#about').offset().top);
            let servicesOffset = Math.ceil($('#services').offset().top);
            let progressBar = document.querySelectorAll('.custom-progress');
            let width;
            
            for(let element of progressBar){
                width = element.getAttribute('data-width');
                if(windowScroll >= aboutOffset - 100 && windowScroll < servicesOffset - 100){
                    $(element).css(
                        'width' , `${width}%`
                    )
                }else{
                    $(element).css('width', '0')
                }
            }
        });

        $('.testimonial-item').owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
    } 
})

