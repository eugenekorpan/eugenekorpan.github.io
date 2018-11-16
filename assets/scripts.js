jQuery(document).ready(function () {
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
//   $('.navbar-link-home').html("____");
//   $('.navbar-link-about').html("____");
//   $('.navbar-link-services').html("____");
//   $('.navbar-link-solutions').html("____");
//   $('.navbar-link-approach').html("____");
//   $('.navbar-link-contact-us').html("____");
// }