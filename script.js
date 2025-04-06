// === YOUR TOMTOM API KEY ===
const TOMTOM_API_KEY = 'Gg70C3AYStbvcFnYqVxnTvDBSx2p7kgG';  // <<<--- Replace this

// === Coordinates Area ===
const mapCenter = [18.477983, 73.890418]; // Jyoti Chowk center

// === Live Map (Left) ===
const liveMap = L.map('liveMap').setView(mapCenter, 16);

// TomTom Tile Layer (Live Traffic Flow)
L.tileLayer(`https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`, {
    attribution: '© TomTom',
}).addTo(liveMap);

L.tileLayer(`https://api.tomtom.com/traffic/map/4/tile/flow/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`, {
    opacity: 0.7
}).addTo(liveMap);

// === Simulation Map (Right) ===
const simulationMap = L.map('simulationMap').setView(mapCenter, 16);

// TomTom Tile Layer (Only Base Map, No Traffic)
L.tileLayer(`https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`, {
    attribution: '© TomTom',
}).addTo(simulationMap);

// === Drag & Drop Markers ===
let markers = [];

simulationMap.on('click', function(e) {
    const marker = L.marker(e.latlng, { draggable: true }).addTo(simulationMap);
    markers.push(marker);
});

// === Suggest Traffic Solutions Button ===
function suggestTrafficSolutions() {
    // Simple AI Simulation (Random Barricades Placement)
    clearSimulation();

    const suggestions = [
        [18.477517, 73.894481],
        [18.473928, 73.88927],
        [18.47221, 73.893521],
    ];

    suggestions.forEach(coord => {
        const marker = L.marker(coord, {
            draggable: false,
            title: 'Suggested Barricade 🚧'
        }).addTo(simulationMap);
        markers.push(marker);
    });

    alert("✅ Suggestions added to the map!");
}

// === Clear Simulation Button ===
function clearSimulation() {
    markers.forEach(marker => {
        simulationMap.removeLayer(marker);
    });
    markers = [];
}
