// Inicialize o mapa
var map = L.map('map').setView([0, 0], 2); // Configurar a visualização inicial

// Adicione um provedor de mapeamento, como o OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var marker; // Variável para armazenar o marcador
var greenMarker; // Variável para armazenar a bolinha verde

// Função para pesquisar a localização
function searchLocation() {
    var locationInput = document.getElementById('locationInput').value;

    // Use a API de geocodificação (Nominatim)
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + locationInput)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);

                // Remova o marcador anterior, se existir
                if (marker) {
                    map.removeLayer(marker);
                }

                map.setView([lat, lon], 12); // Defina o mapa para a localização encontrada
                marker = L.marker([lat, lon], { draggable: true }).addTo(map); // Adicione um marcador arrastável
                marker.on('dragend', function(e) {
                    var lat = e.target.getLatLng().lat;
                    var lon = e.target.getLatLng().lng;
                    showCoordinates(lat, lon); // Exiba as coordenadas quando o marcador for arrastado
                });
            } else {
                alert('Localização não encontrada.');
            }
        })
        .catch(function(error) {
            console.error('Erro ao buscar localização:', error);
        });
}

// Função para exibir as coordenadas de latitude e longitude em um alerta
function showCoordinates(lat, lon) {
    alert('Latitude: ' + lat + ', Longitude: ' + lon);
}
