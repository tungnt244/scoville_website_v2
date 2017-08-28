$(document).ready(function() {
  $(window).scroll(function () {
      var img = document.getElementById('mainimage');
      var nav = document.getElementById('my-navbar');
      if(!img) return
      var hi = img.clientHeight;
      var navHi = nav.clientHeight;
      nav.style.marginBottom = -navHi+"px";
    if ($(window).scrollTop() > hi) {
      $('#my-navbar').addClass('fixed');
    }
    if ($(window).scrollTop() < hi) {
      $('#my-navbar').removeClass('fixed');
    }
  });
});

function initMap() {
  var uluru = {lat: 35.646679, lng: 139.701801};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}