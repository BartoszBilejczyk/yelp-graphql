<template>
  <div class="map">
    <GmapMap
      ref="map"
      :center="{ lat: 52.237022, lng: 21.050440 }"
      :zoom="15"
      :options="mapStyle"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :clickable="true"
        :icon="{ url: require('../assets/dot.svg')}"
        @click="selectOnList(marker, index)"

      />
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <MapWindow
          v-if="currentMarkerInfo.name"
          :info="currentMarkerInfo"
        ></MapWindow>
      </GmapInfoWindow>
    </GmapMap>
    <div class="overlay overlay1"></div>
    <div class="overlay overlay2"></div>
    <div class="overlay overlay3"></div>
    <div class="overlay overlay4"></div>
  </div>
</template>

<script>
  import MapWindow from '@/components/MapWindow.vue'
  import { gmapApi } from "vue2-google-maps"
  import { GET_CATEGORIES } from '../graphql/categories.query';
  import { GET_CENTER, GET_ZOOM } from '../graphql/local.query';

  export default {
    name: 'Map',
    components: {
      MapWindow
    },
    props: {
      results: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        categories: [],
        mapStyle: {
          styles: [
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#bdbdbd'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dadada'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5'
                }
              ]
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#c9c9c9'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e'
                }
              ]
            }
          ]
        },
        map: null,
        currentMarkerInfo: {},
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMarker: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      };
    },
    computed: {
      google: gmapApi,
      markers() {
        if (!this.results || !this.results.length) {
          return [];
        }

        const bounds = new this.google.maps.LatLngBounds();

        const markers = this.results.map(result => {
          const position = new this.google.maps.LatLng(result.coordinates.latitude, result.coordinates.longitude);
          bounds.extend(position)

          return {
            position: {
              lat: result.coordinates.latitude,
              lng: result.coordinates.longitude,
            },
            name: result.name,
            id: result.id
          }
        });

        this.$refs.map.fitBounds(bounds);

        return markers;
      }
    },
    apollo: {
      categories: {
        query: GET_CATEGORIES
      },
      center: {
        query: GET_CENTER
      },
      zoom: {
        query: GET_ZOOM
      }
    },
    methods: {
      toggleInfoWindow (marker) {
        this.infoWindowPos = marker.position;
        this.currentMarkerInfo = marker;


        if (this.currentMarker == marker.id) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        else {
          this.infoWinOpen = true;
          this.currentMarker = marker.id;
        }
      },
      selectOnList(marker, index) {
        this.toggleInfoWindow(marker);
        this.$store.commit('setActiveMarker', marker.id)
        document.getElementsByClassName('results__item')[index].scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<style lang="scss">
  .map {
    width: calc(100% - 200px);
    height: calc(100vh - 92px);
    position: relative;
    left: -44px;

    .overlay {
      position: absolute;
      width: 100%;
      height: inherit;
    }

    .overlay1 {
      background: linear-gradient(90deg, #CFCFE6 25%, transparent);
      top: 0;
      left: 0;
      width: 15%;
    }

    .overlay2 {
      background: linear-gradient(90deg, transparent 25%, #CFCFE6);
      top: 0;
      right: 0;
      width: 25%;
    }

    .overlay3 {
      background: linear-gradient(180deg, #CFCFE6 25%, transparent);
      height: 15%;
      top: 0;
    }

    .overlay4 {
      background: linear-gradient(180deg, transparent 25%, #CFCFE6);
      height: 15%;
      bottom: 0;
    }

    .vue-map-container {
      width: 100%;
      height: inherit;

      svg.marker-dot {
        fill: #fff;
      }
    }
  }
</style>
