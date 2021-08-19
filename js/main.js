$(document).ready(function () {
    if ($('.home-page').length > 0) {
        let goTopBtn = $('#goTop');
        let homeOffset = Math.ceil($('#home').offset().top);

        // Navbar chnage backgroundColor & padding on scroll 
        $(window).scroll(function () {
            let windowScroll = Math.ceil($(window).scrollTop());

            if (windowScroll >= 50) {
                $('nav').css({
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: '15px 0'
                });
            }
            else {
                $('nav').css({
                    backgroundColor: 'transparent',
                    padding: '30px 0'
                });
            }
        });

        // Add active class to links on click
        $('.list-link').click(function () {
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

            for (let link of links) {
                let sectionHref = $(link).attr('href');
                let sectionOffset = Math.ceil($(sectionHref).offset().top);
                if (windowScroll >= sectionOffset - 100) {
                    $(link).addClass('active');
                    $(link).parent().siblings().children().removeClass('active')
                }
            }
        })

        // Show go up button on scroll
        $(window).scroll(function () {
            let windowScroll = Math.ceil($(window).scrollTop());
            let homeHeight = $('#home').height();

            if (windowScroll >= homeHeight - 100) {
                $(goTopBtn).css('opacity', '1');
            } else {
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

            for (let element of progressBar) {
                width = element.getAttribute('data-width');
                if (windowScroll >= aboutOffset - 100 && windowScroll < servicesOffset - 100) {
                    $(element).css(
                        'width', `${width}%`
                    )
                } else {
                    $(element).css('width', '0')
                }
            }
        });

        //counter
        let counters = document.querySelectorAll('.counter-number');

        let countUp = function () {
            counters.forEach((counter) => {
                $(window).scroll(function () {
                    let windowScroll = Math.ceil($(window).scrollTop()),
                        counterOffset = Math.ceil($('.counter').offset().top);
                    workOffset = Math.ceil($('#portfolio').offset().top);



                    if (windowScroll >= counterOffset - 300 && windowScroll <= workOffset - 100) {
                        function updateCounter() {
                            let target = Number(counter.getAttribute('data-target'));
                            let c = Number(counter.innerText);
                            let increment = target / 500;
                            if (c < target) {
                                counter.innerText = `${Math.ceil(c + increment)}`;
                                setInterval(updateCounter, 1)
                            } else {
                                counter.innerText = target;

                            }
                        }
                        updateCounter();
                    }

                })

            });
        }
        countUp();

        // Modal
        let images = document.querySelectorAll('.port-img');
        let modalImage = document.querySelector('.modal-img');
        let nextBtn = document.getElementById('next');
        let prevBtn = document.getElementById('prev');
        let closeBtn = document.getElementById('close');
        let imagesArr = Array.from(images);
        let index;


        for (let image of images) {
            $(image).click(function () {
                let imageSrc = $(this).attr('src');
                index = imagesArr.indexOf(image);

                $('.portfolio-modal').css({
                    display: 'flex',
                });
                $(goTopBtn).css('opacity', '0');
                $(modalImage).attr('src', imageSrc);
                $('body').css('overflow', 'hidden');
            })
        }

        function next() {
            index++;
            if (index > imagesArr.length - 1) {
                index = 0;
                $(modalImage).attr('src', imagesArr[0].getAttribute('src'));
            } else {
                $(modalImage).attr('src', imagesArr[index].getAttribute('src'));
            }
        }

        function prev() {
            index--;
            if (index < 0) {
                index = imagesArr.length - 1;
                $(modalImage).attr('src', imagesArr[index].getAttribute('src'));
            } else {
                $(modalImage).attr('src', imagesArr[index].getAttribute('src'));
            }
        }

        function close() {
            $('.portfolio-modal').css('display', 'none');
            $('body').css('overflow', 'auto');
        }

        $(nextBtn).click(next);

        $(prevBtn).click(prev);

        $(closeBtn).click(close);

        $(document).keyup(function (event) {
            let key = event.code;
            if ($('.portfolio-modal').css('display') !== 'none') {
                if (key === 'ArrowRight') {
                    next();
                }
                if (key === 'ArrowLeft') {
                    prev();
                }
                if (key === 'Escape') {
                    close();
                }
            }
        });

        // Menu bars
        $('#menuicon').click(function () {
            $(this).toggleClass('icon-close');
            $(this).toggleClass('icon-bars');
            $('#custom-navbar').toggleClass('mobile-navbar');
            $('#custom-navbar').toggleClass('custom-navbar');
            $('.dropdown-list').toggleClass('mobile');
            $('#dropdown').click(function(){
                $('.dropdown-list').slideToggle(1000);
            })
        });


        // Testimonials Owl Carousel
        $('.testimonial-item').owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    }
})

