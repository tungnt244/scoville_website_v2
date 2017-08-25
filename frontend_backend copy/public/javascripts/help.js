$(document).ready(function() {
  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      var img = document.getElementById('mainimage');
      if(!img) return
      var hi = img.clientHeight;
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