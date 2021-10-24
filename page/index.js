let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.344380778805565, lng: -73.10850732935332 },
    zoom: 14,
  });
}

function reloadMapIframe() {
  document.getElementById('map').contentWindow.location.reload();
}