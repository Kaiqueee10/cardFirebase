// Inicializa o mapa com as coordenadas iniciais de Av. da Saudade, Campinas - SP
var initialLat = -22.914822689607544; // Latitude inicial
var initialLon = -47.05588272446561; // Longitude inicial

document.addEventListener('DOMContentLoaded', function() {
    // Cria o mapa e ajusta a visualização inicial para as coordenadas especificadas com um nível de zoom adequado
    var map = L.map('map').setView([initialLat, initialLon], 15);

    // Adiciona a camada de tiles do OpenStreetMap ao mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Adiciona um marcador na posição inicial
    var marker = L.marker([initialLat, initialLon]).addTo(map);
    marker.bindPopup("<b>Localização Inicial</b><br>Av. da Saudade, Campinas - SP").openPopup();

    // Adiciona o controle de geocodificação usando o plugin Leaflet Control Geocoder
    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
    }).on('markgeocode', function(e) {
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
            bbox.getSouthEast(),
            bbox.getNorthEast(),
            bbox.getNorthWest(),
            bbox.getSouthWest()
        ]).addTo(map);
        map.fitBounds(poly.getBounds());
    }).addTo(map);

    // Função para buscar endereços e centralizar no mapa
    geocoder.on('markgeocode', function(event) {
        var center = event.geocode.center;
        L.marker(center, {icon: L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
            iconSize: [38, 95], // Tamanho do ícone
            iconAnchor: [22, 94], // Ponto do ícone que corresponderá à localização do marcador
            popupAnchor: [-3, -76] // Ponto onde a popup deve abrir em relação ao ícone
        })}).addTo(map)
          .bindPopup(event.geocode.name)
          .openPopup();
        map.setView(center, 16); // Ajusta o zoom para uma visualização mais detalhada
    });
});
