import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState(
    {
        storage: window.sessionStorage
    })],

  state: {
    parks: [],
    openList: [],
    markList: [],
    gettingLocation: false,
    error: true,
    cityHall: {
        latitude: 37.566361,
        longitude: 126.977944
    },
    currentLocation: {
        latitude: 37.566361,
        longitude: 126.977944
    },
  },

  getters: {
    parks: (state) => { return state.parks },
    openList: (state) => {
        var list = state.openList.map(x=>JSON.parse(x))
        return list
    },
    markList: (state) => { 
      var list = state.markList.map(x=>JSON.parse(x))
      return list
    },
    latitude: (state) => { return state.currentLocation.latitude },
    longitude: (state) => { return state.currentLocation.longitude },
  },

  mutations: {
  setError(state, payload) {
      state.error = payload
      console.log("error:", payload)
  },

  setGettingLocation(state, payload) {
      state.gettingLocation = payload
      console.log("gettingLocation :", payload)
  },

  setLocation(state, payload) {
      var location = {
          latitude: payload.latitude,
          longitude: payload.longitude
      }
      state.currentLocation = location
      console.log("Location:", state.currentLocation)
  },

    getinfo(state, payload) {
      state.parks = []
      for (let item of payload) {
        var park = {
          parkname: "",
          image: "",
          address: "",
          overview: "",
          area: "",
          mainfacility: "",
          goods: "",
          guidemap: "",
          direction: "",
          notes: "",
          pnum: "",
          district: "",
          division: "",

          location: "",
          latitude: "",
          longitude: "",

          ratings: (Math.random() * 5).toFixed(1),
          distance: "",

        }

        park.parkname = item._source.Park_name
        park.image = item._source.Image
        park.address = item._source.Parcel_address !== null ? item._source.Parcel_address : item._source.Road_address
        park.overview = item._source.Park_overview !== null ? item._source.Park_overview : "????????????"
        park.area = item._source.Park_area !== null ? item._source.Park_area : "????????????"
        park.mainfacility = item._source.Main_facility !== null ? item._source.Main_facility : "????????????"
        park.goods = item._source.Sporting_goods !== null ? item._source.Sporting_goods : "????????????"
        park.guidemap = item._source.Guidemap
        park.direction = item._source.Direction !== null ? item._source.Direction : "????????????"
        park.notes = item._source.Use_notes !== null ? item._source.Use_notes : "????????????"
        park.pnum = item._source.Park_number !== null ? item._source.Park_number : "????????????"
        park.district = item._source.District
        park.division = item._source.Park_division

        park.location = item.location
        park.latitude = item._source.Latitude
        park.longitude = item._source.Longitude
        park.distance = ("??????????????? "+ Math.round(item.sort * 100) / 100 + "km")  

        state.parks.push(park)    // parks??? ???????????? ?????? 
      }
    },
    addOpenList(state, payload) {
      console.log("payload")
      console.log(payload)
      // var recent = payload
      console.log(state.openList.includes(payload))
      if (!state.openList.includes(payload)) {
          state.openList.push(payload)
        }
    },
    addMarkList(state, payload) {
      if(!state.markList.includes(payload)) {
          state.markList.push(payload)
      }
      else {
          state.markList.splice(state.markList.indexOf(payload), 1)
        }
    }
  },

  actions: {
    getLocation({commit}) {
      //do we support geolocation
      if(!("geolocation" in navigator)) {
        commit("setError", true)
        return;
      }
      
      commit("setGettingLocation", true)

      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        commit("setError", false)
        commit("setGettingLocation", false)
        commit("setLocation", pos.coords)
        console.log('userLocation: ', pos);
      }, err => {
        commit("setGettingLocation", false)
        commit("setError", true)
        console.log('Error message ', err);
        console.log('latitude ', 37.566361 , ', longitude ' , 126.977944);
      })
  },

  getinfo({ commit }, inputText) {
    console.log(inputText)
    var latitude = null
    var longitude = null
    if(this.state.error) {
      latitude = this.state.cityHall.latitude,
      longitude = this.state.cityHall.longitude
    }
    else {
      latitude = this.state.currentLocation.latitude,
      longitude = this.state.currentLocation.longitude
    }
    axios
      .get("https://20.194.30.72:8000/parkmoa", {
        params: {
          search: inputText,
          latitude,
          longitude
        }
      })
      .then((res) => {
        var parkInfo = []
        console.log(res.data)
        parkInfo = res.data.hits
        console.log("parkinfo")
        console.log(res.data.hits)
        commit("getinfo", parkInfo)
        router.push({ name: "Search", query: { param: inputText }}).catch(e => {
          if (e === "NavigationDuplicated")
            router.replace({ name: "Search", query: { param: inputText } })
        });
      })
  },
  addOpenList({ commit }, payload) {
      commit("addOpenList", payload)
  },
  addMarkList({ commit }, payload ) {
      commit("addMarkList", payload)
  }
},
modules: {},
});

// ?????? -> ?????? ???????????? api
// coord2Address(x, y, callback, options)
// ?????? ?????? ???????????? ??? ????????? ????????? ?????? ????????? ????????????.
// ????????? ????????? ????????? ????????? ???????????? ?????? ??? ??????.

// var geocoder = new kakao.maps.services.Geocoder();

// var coord = new kakao.maps.LatLng(37.56496830314491, 126.93990862062978);
// var callback = function(result, status) {
//     if (status === kakao.maps.services.Status.OK) {
//         console.log(result[0].address.address_name);
//     }
// };

// geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
// Parameters
// x Number : x ??????, ???????????? ?????? longitude
// y Number : y ??????, ???????????? ?????? latitude
// callback Function : ?????? ????????? ?????? ????????????
// options Object
// input_coord Coords : ?????? ?????? ??????. ???????????? WGS84
