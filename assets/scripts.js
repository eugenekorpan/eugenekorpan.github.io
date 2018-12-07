jQuery(document).ready(function () {
  // $(window).resize(() => {
  //   let x = $(window).width()/1920;
  //   $('.navbar').css('zoom', x);
  // });
  $('.main-header .open-navbar-btn').click(() => {
    if ($('.alt-navbar').is(':visible')) {$('.alt-navbar').hide()}
      else {$('.alt-navbar').show()}    
    });

  $('#carouselMainPage.carousel .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length>0) {
      next.next().children(':first-child').clone().appendTo($(this));
    }
    else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });

  $(".navbar-container").addClass(sessionStorage.getItem("navbar"));

  $(".navbar-button-hide").click(() => {
    let n = $(".navbar-container");
    n.toggleClass("navbar-hide");
    if(n.hasClass("navbar-hide")) {
      sessionStorage.setItem("navbar", "navbar-hide");
    }
    else {sessionStorage.setItem("navbar", "")}
  });

  $("#aboutCarousel").on("touchstart", function(event){
    let xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
      let xMove = event.originalEvent.touches[0].pageX;
      if( Math.floor(xClick - xMove) > 5 ){
        document.getElementsByClassName('about-carousel-control-next-btn')[0].click();
      }
      else if( Math.floor(xClick - xMove) < -5 ){
        document.getElementsByClassName('about-carousel-control-prev-btn')[0].click();
      }
    });
    $("#aboutCarousel").on("touchend", function(){
      $(this).off("touchmove");
    });
  });

  setInterval(() => {
    for (let i = 1; i <= 4; i++) {      
      if ($('#aboutCarousel .indicator-' + i).hasClass('active')) {slideChange(i)};
    }
  }, 200);

  let currentSlide;
  slideChange = (slide) => {
    if (currentSlide !== slide) {
      currentSlide = slide;
      console.log(currentSlide)
      for (let i = 1; i <= 4; i++) {
        $('.about .about-text-' + i).css('display', 'none');
      }
      $('.about .about-text-' + slide).css('display', 'inline');
    }
  }

});