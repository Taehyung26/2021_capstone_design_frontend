<template>
<!-- Search.vue, Mark_list.vue, Open_list.vue 화면에 들어가야 함. -->

  <!-- 검색 정렬 순 / 옆에 확인 버튼도 만들어야겠다 -->
  <v-layout fluid>
    <v-row class="mt-3" align="center" justify="center">
      <v-col class="d-flex" cols="12" sm="5">
        <v-select
          v-model="category"
          :items="park_sort"
          item-text="sort"
          label="정렬"
          dense
        >
        </v-select>
      </v-col>
    </v-row>
  </v-layout>
</template>


<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      //검색 정렬순 설정
      park_sort: [
        { 
          sort: "거리순", 
        }, 
        { 
          sort: "별점순",
        }
      ],
      category: "거리순", // 위치순이 기본 정렬 / 안 하고 싶으면 null
    };
  },
  methods: {
    ...mapActions(["getinfo"]),
  },
};

// var getinfo =[]; //문제점! getinfo 는 search 검색 결과로 나온 공원 위도,경도 정보들 불러와야 함.

// //사용자 위치 동의 불러와서 -> for문 돌리기
// navigator.geolocation.getCurrentPosition((position) => {
//   let latitude = position.coords.latitude; //위도
//   let longitude = position.coords.longitude; //경도

//   console.log('latitude', latitude + ', longitude', longitude);

//   for(let i=0 ; i<getinfo.length ; i++) {
//     let distance = getDistance(latitude, longitude, getinfo[i].latitude, getinfo[i].longitude, "K");
//     getinfo[i].distance = distance;
//   }

//   //newSortList에 getinfo를 distance 순으로 정렬
//   let newSortList = getinfo.sort(function (a,b){
//     if (a.distance > b.distance) {
//       return 1;
//     }
//     if (a.distance < b.distance) {
//       return -1;
//     }
//     //a must be equal to b
//     return 0;
//   });

//   console.log(newSortList);

// }, 
// // (err) => {},
// );

// //사용자 위도 경도를 이용해서 거리순 정렬
// function getDistance(lat1, lon1, lat2, lon2, unit) {
// 	if ((lat1 == lat2) && (lon1 == lon2)) {
// 		return 0;
// 	}
// 	else {
// 		var radlat1 = Math.PI * lat1/180;
// 		var radlat2 = Math.PI * lat2/180;
//     // var radlon1 = Math.PI * lon1/180;
//     // var radlon2 = Math.PI * lon2/180;
// 		var theta = lon1-lon2;
// 		var radtheta = Math.PI * theta/180;
// 		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
// 		if (dist > 1) {
// 			dist = 1;
// 		}
// 		dist = Math.acos(dist);
// 		dist = dist * 180/Math.PI;
// 		dist = dist * 60 * 1.1515;
// 		if (unit=="K") { dist = dist * 1.609344 } //K = 킬로미터
// 		if (unit=="N") { dist = dist * 0.8684 } //N = 해리
// 		return dist;
	// }
// }
</script>

<style>
</style>

