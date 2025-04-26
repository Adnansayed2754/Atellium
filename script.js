// Insert your TomTom API key below
const apiKey = "Gg70C3AYStbvcFnYqVxnTvDBSx2p7kgG";

// Define map center
const puneCenter = [18.4775, 73.8910]; 

// Initialize Live Traffic Map
const liveMap = tt.map({
    key: apiKey,
    container: "liveMap",
    center: puneCenter,
    zoom: 15,
    traffic: { flow: true, incidents: true }
});
liveMap.addControl(new tt.FullscreenControl());
liveMap.addControl(new tt.NavigationControl());

// Initialize Optimized Map
const optimizedMap = tt.map({
    key: apiKey,
    container: "optimizedMap",
    center: puneCenter,
    zoom: 15,
    traffic: { flow: true }
});
optimizedMap.addControl(new tt.FullscreenControl());
optimizedMap.addControl(new tt.NavigationControl());

let routeLayer;

// Suggest Optimized Route
function suggestOptimizedRoute() {
    const startPoint = {lat: 18.4781, lng: 73.8904};
    const endPoint = {lat: 18.4722, lng: 73.8935};

    tt.services.calculateRoute({
        key: apiKey,
        traffic: true,
        locations: [`${startPoint.lng},${startPoint.lat}:${endPoint.lng},${endPoint.lat}`],
    })
    .then(response => {
        if (routeLayer) {
            optimizedMap.removeLayer(routeLayer);
        }
        const geoJson = response.toGeoJson();
        routeLayer = new tt.GeoJSONLayer({ geoJson });
        optimizedMap.addLayer(routeLayer);
        optimizedMap.fitBounds(routeLayer.getBounds(), { padding: 50 });
    })
    .catch(error => console.error(error));
}

// Clear Routes
function clearRoutes() {
    if (routeLayer) {
        optimizedMap.removeLayer(routeLayer);
        routeLayer = null;
    }
}
