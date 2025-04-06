// Coordinates for your interested area
const centerCoordinates = [18.477983, 73.890418];

// Initialize AFTER page loads
window.onload = function() {
    // Initialize live traffic map (left)
    const liveMap = tomtom.map({
        key: 'j1XgVlO5541Ns9LAE7kLF8fSAZfcikfh',
        container: 'liveTrafficMap',
        center: centerCoordinates,
        zoom: 15
    });
    liveMap.addTrafficFlow();

    // Initialize simulation map (right)
    const simulationMap = L.map('simulationMap').setView(centerCoordinates, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(simulationMap);

    // Array to hold simulated objects
    let simulatedObjects = [];

    // Function to add draggable barricade
    window.addBarricade = function(latlng) {
        const marker = L.marker(latlng, { draggable: true }).addTo(simulationMap);
        marker.bindPopup('Barricade');
        simulatedObjects.push(marker);
    }

    // Suggest rerouting
    window.suggestSolutions = function() {
        alert('Rush AI: Suggested action -> Add temporary barricade at nearby junction to reroute traffic.');
        addBarricade([18.477, 73.892]);
    }

    // Clear all simulated changes
    window.clearSuggestions = function() {
        simulatedObjects.forEach(obj => simulationMap.removeLayer(obj));
        simulatedObjects = [];
    }
};
