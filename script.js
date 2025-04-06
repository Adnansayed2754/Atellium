// Your TomTom API key here
const apiKey = 'Gg70C3AYStbvcFnYqVxnTvDBSx2p7kgG';

// Initialize the live traffic map (TomTom)
let liveTrafficMap = tt.map({
    key: apiKey,
    container: 'liveTrafficMap',
    style: 'tomtom://vector/1/basic-main',
    center: [73.890441, 18.478102],
    zoom: 14,
    traffic: { flow: true, incidents: true }
});

// Add traffic flow layer
liveTrafficMap.addLayer({
    id: 'traffic-flow',
    type: 'line',
    source: {
        type: 'vector',
        url: 'tomtom://vector/traffic-flow'
    },
    'source-layer': 'flow',
    layout: {
        'line-cap': 'round',
        'line-join': 'round'
    },
    paint: {
        'line-color': '#ff0000',
        'line-width': 3
    }
});

// Initialize the simulation map (Leaflet)
let simulationMap = L.map('simulationMap').setView([18.478102, 73.890441], 15);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(simulationMap);

// Moving car marker list
let cars = [];

// Add random moving cars
function addMovingCars() {
    for (let i = 0; i < 5; i++) {
        let lat = 18.477 + Math.random() * 0.01;
        let lng = 73.889 + Math.random() * 0.01;
        let car = L.marker([lat, lng], {icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/296/296216.png',
            iconSize: [30, 30]
        })}).addTo(simulationMap);
        cars.push({ marker: car, speedLat: (Math.random() - 0.5) * 0.0005, speedLng: (Math.random() - 0.5) * 0.0005 });
    }
}

// Move cars function
function moveCars() {
    cars.forEach(car => {
        let current = car.marker.getLatLng();
        let newLat = current.lat + car.speedLat;
        let newLng = current.lng + car.speedLng;
        car.marker.setLatLng([newLat, newLng]);
    });
}

// Call add cars once
addMovingCars();

// Update cars every 500ms
setInterval(moveCars, 500);

// Drag and drop toolbox items
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("type", ev.target.getAttribute('data-type'));
}

function drop(ev) {
    ev.preventDefault();
    let type = ev.dataTransfer.getData("type");
    let coords = simulationMap.containerPointToLatLng(L.point(ev.offsetX, ev.offsetY));

    let iconUrl = type === 'barrier' 
        ? 'https://cdn-icons-png.flaticon.com/512/809/809957.png' 
        : 'https://cdn-icons-png.flaticon.com/512/684/684908.png';

    L.marker([coords.lat, coords.lng], {icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [30, 30]
    })}).addTo(simulationMap);
}

simulationMap.getContainer().addEventListener('dragover', allowDrop);
simulationMap.getContainer().addEventListener('drop', drop);

// Suggest solutions button
function suggestSolutions() {
    alert('Traffic rerouting suggestions coming soon!');
}

// Clear suggestions button
function clearSuggestions() {
    simulationMap.eachLayer(layer => {
        if (layer instanceof L.Marker && !cars.find(c => c.marker === layer)) {
            simulationMap.removeLayer(layer);
        }
    });
}
