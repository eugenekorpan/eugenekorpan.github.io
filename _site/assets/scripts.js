jQuery(document).ready(function () {
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

  $("nav").addClass(sessionStorage.getItem("navbar"));

  $(".navbar-button-hide").click(() => {
    let n = $("nav");
    n.toggleClass("navbar-hide");
    if(n.hasClass("navbar-hide")) {
      sessionStorage.setItem("navbar", "navbar-hide");
    }
    else {sessionStorage.setItem("navbar", "")}
  });
});










// function clearNavLinks() {
// }


// let trans = "nav, .navbar-links, .navbar-link, .navbar-main-logo, .navbar-button-hide, " +
// ".navbar-line"

//  $(trans).addClass("no-transition");  

// $(trans).removeClass("no-transition");