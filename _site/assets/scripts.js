jQuery(document).ready(function () {
	// let trans = "nav, .navbar-links, .navbar-link, .navbar-main-logo, .navbar-button-hide, " +
	// ".navbar-line"

 //  $(trans).addClass("no-transition");
  $("nav").addClass(sessionStorage.getItem("navbar"));
  // $(trans).removeClass("no-transition");

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