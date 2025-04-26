// Initialize Live Traffic Map
var liveMap = L.map('liveTrafficMap').setView([18.4775, 73.8925], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(liveMap);

// Initialize Simulation Map
var simulationMap = L.map('simulationMap').setView([18.4775, 73.8925], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(simulationMap);

// Drag and Drop Setup
const dragItems = document.querySelectorAll('.drag-item');
dragItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('id', e.target.id);
    });
});

simulationMap.getContainer().addEventListener('dragover', (e) => {
    e.preventDefault();
});

simulationMap.getContainer().addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const bounds = simulationMap.getBounds();
    const lat = bounds.getSouth() + (bounds.getNorth() - bounds.getSouth()) * (e.offsetY / simulationMap.getSize().y);
    const lng = bounds.getWest() + (bounds.getEast() - bounds.getWest()) * (e.offsetX / simulationMap.getSize().x);

    L.marker([lat, lng], {
        icon: L.icon({
            iconUrl: document.getElementById(id).src,
            iconSize: [30, 30],
        })
    }).addTo(simulationMap);
});

// Button Actions
function suggestSolutions() {
    alert("Suggesting traffic optimizations...");
}

function clearSuggestions() {
    simulationMap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            simulationMap.removeLayer(layer);
        }
    });
}
