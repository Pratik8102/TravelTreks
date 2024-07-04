
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5,40], // starting position [lng, lat]
    zoom: 6, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(),'bottom-left');

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

new mapboxgl.Marker()
    .setLngLat(campground?.geometry?.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
           .setHTML(
            `<h3>${campground?.title}</h3> <p>${campground?.location}</P>`
            )
    )
    .addTo(map)