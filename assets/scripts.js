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
});

// var canvas = document.getElementById("about-line-animation"), 
// context = canvas.getContext("2d");
// context.lineWidth = 2;
// context.lineCap = "round";
// context.beginPath();
// context.moveTo(30, 20);
// context.lineTo(50,250);
// context.lineTo(450,250);
// context.lineTo(250,50);
// context.strokeStyle = "rgb(225,162,0)";
// context.stroke();