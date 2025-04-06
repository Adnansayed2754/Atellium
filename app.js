// Your TomTom API Key
const TOMTOM_API_KEY = "j1XgVlO5541Ns9LAE7kLF8fSAZfcikfh";

// Map Center based on your coordinates
const mapCenter = [18.4755, 73.8919]; // Average point

// Initialize Live Map
const liveMap = L.map('liveMap').setView(mapCenter, 16);

// Add TomTom Traffic Tile Layer
L.tileLayer(`https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`, {
    attribution: '© TomTom',
    tileSize: 256,
    zoomOffset: 0,
    maxZoom: 22,
    minZoom: 10
}).addTo(liveMap);

// Initialize Simulation Map
const simMap = L.map('simMap').setView(mapCenter, 16);

// Add Normal Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 22,
    minZoom: 10
}).addTo(simMap);

// Adding interaction for Simulation
let barricades = [];

simMap.on('click', function(e) {
    const marker = L.marker(e.latlng, {
        draggable: true
    }).addTo(simMap).bindPopup('Barricade/Signal');
    barricades.push(marker);
});

// Suggest Button
document.getElementById('suggestBtn').addEventListener('click', function() {
    alert('⚡ AI Suggestion Feature Coming Soon!\nFor now, manually place barricades.');
});

// Clear Suggestions
document.getElementById('clearBtn').addEventListener('click', function() {
    barricades.forEach(marker => {
        simMap.removeLayer(marker);
    });
    barricades = [];
});
