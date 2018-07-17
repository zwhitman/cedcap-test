<template>
  <div>
    <div id="webmap"></div>
  </div>
</template>

<script>

export default {
  name: 'webmap',
  props: {
    activeItem: Array,
    currentLocation: Array,
  },

  data () {
    return {
      _map: null
    };
  },


  mounted() {
    //Initialze Map
    mapboxgl.accessToken = 'pk.eyJ1IjoiendoaXRtYW4iLCJhIjoieEZNeHdNQSJ9.mXXZjIJ2PYMZ6le-o3f90A';
    const map = new mapboxgl.Map({
      container: 'webmap', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-97.0000, 38.0000],
      zoom: 2, // starting zoom
    });

    this._map = map;

    this._map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
       },
        trackUserLocation: true,
        fitBoundsOption: 13,
    }));
    setTimeout(function() {
      document.querySelector('.mapboxgl-ctrl-geolocate').click();
    },1000);

    this._map.on('load', function () {
      map.addLayer({
	id: 'locations',
	type: 'symbol',
	// Add a GeoJSON source containing place coordinates and information.
	source: {
	  type: 'geojson',
	  data: data
	},
	layout: {
	  'icon-image': 'circle-11',
	  'icon-allow-overlap': true,
	}
      });

      // zoom to extent
      var bounds = new mapboxgl.LngLatBounds();
      data.features.forEach(function(feature) {
	bounds.extend(feature.geometry.coordinates);
      });
      map.fitBounds(bounds, {padding: 50});

      map.on('click', function(e) {
	var features = map.queryRenderedFeatures(e.point, {
	  layers: ['locations'] // replace this with the name of the layer
	});

	if (!features.length) {
	  return;
	}

	var feature = features[0];

	var popup = new mapboxgl.Popup({ offset: [0, -15] })
	  .setLngLat(feature.geometry.coordinates)
	  .setHTML(
	    '<h3>' + feature.properties.NAME + '</h3><p>' + feature.properties.ADDRESS + '</p>' + '<span class="coords">' + feature._geometry.coordinates[1].toFixed(2) + '&deg N<br>'+feature._geometry.coordinates[0].toFixed(2)*-1+'&deg W</span><div class="btn-container"></div>'
	  )
	  .setLngLat(feature.geometry.coordinates)
	  .addTo(map);
      });

    });
  },


  computed: {
    theActiveItemTest(){
      //return this.$store.getters.getActiveLocation;
      return this.$store.getters.getActiveItem;
    },
    getActive(){
      return this.theActiveItem
    },
    getAddresses() {
      var x = this.$store.getters.getAddresses.features
      console.log(x)


      return this.$store.getters.getAddresses.features
    }
  },

  watch: {
    theActiveItemTest: function () {
      var test2 = this.$store.getters.getUserLocation
      var arrays = [
	this.theActiveItemTest,
	test2,
      ]

      console.log(arrays)
      this.loadMap(arrays);
    },
  },

  methods: {
    loadMap: function (latLng) {
      // zoom to extent
      var bounds = new mapboxgl.LngLatBounds();
      latLng.forEach(function(feature) {
	bounds.extend(feature);
      });
      this._map.fitBounds(bounds, {padding: 50});
    },
  },
};

</script>

<style>
#webmap {
  position: fixed;
  height: 100%;
  width: 100%;
}
.btn-container {
  bottom: 0;
  width: 100%;
  display: flex;
}
.coords {
  position: absolute;
  opacity: .8;
  top: 0;
  right: 0;
  font-size: .7em;
  padding: 5px 5px;
  line-height: 15px;
  background-color: rgba(0,0,0,.05);

}
.mapboxgl-popup-content {
  padding-bottom: 40px;
}
.mapboxgl-popup-content > h3 {
  padding-right: 40px;
}
.mapboxgl-popup-close-button {
  height: 40px;
  width: 100%;
  background-color: lightgrey;
  bottom: 0;
  right: 0;
  top: calc(100% - 40px);
}
</style>
