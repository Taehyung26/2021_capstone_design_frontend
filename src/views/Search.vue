<template>
  <div>
    <HeaderBar :param="$route.query.param"/>
    <Sort />


    <v-container class="mx-auto" max-width="full">
      <v-list-item two-line class="text-left">
        <v-list-item-content>
            <!-- 정렬 기준 -->
            <v-list-item-subtitle v-if="$store.state.error" class="mt-2 caption">
                '서울특별시청 주소' 기준
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else class="mt-2 caption">
                '사용자 위치 주소' 기준
            </v-list-item-subtitle>
           
            <!-- 검색결과 개수 -->
            <v-list-item-subtitle v-if="page === 1" class="caption">
                '{{$route.query.param}}'(으)로 입력한 검색결과 {{ $store.getters.parks.length.toLocaleString("ko-KR") }}개
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else class="caption">
                '{{$route.query.param}}'(으)로 입력한 검색결과 {{ $store.getters.parks.length.toLocaleString("ko-KR") }}개
                중 {{ page }}페이지
            </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!--검색결과 list -->
      <v-list>
        <v-list-item v-for="(item, i) in calData" :key="i" v-ripple>
          <v-list-item-content class="pb-0">
          <v-row>
            <!--북마크 하트 아이콘 -->
             <v-col class="align-self-center" cols="auto">
              <v-item-group>
                <v-item>
                  <v-btn icon dark color="rgb(219, 116, 75)" @click="addMarkList(JSON.stringify(item))">
                    <v-icon>
                       
                      {{ $store.state.markList.includes(JSON.stringify(item)) ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                  </v-btn>
                </v-item>
              </v-item-group>
            </v-col>

            <!-- 공원 정보 : 사진,이름,주소,별점,거리순 -->
            <v-img class="parkImage" v-if="item.image !== null" :src="item.image" max-width="300" min-width="300" height="220"></v-img>
            <v-img class="parkImage" v-else src="@/assets/회색.png" max-width="300" min-width="300" height="220"></v-img>   
            <v-col class="ml-2" @click="$router.push({name: 'ParkInfo', query: {item: JSON.stringify(item)}})"> <!-- 파크인포 새로고침 해도 넘어오게 제이슨객체 스트링화-->
              <h3 class="d-flex font-weight-bold mt-2" v-text="item.parkname" style="color: #1a237e"></h3>
              <p class="d-flex mt-15" v-text="item.address"></p>
               <p class="d-flex">
                <v-rating
                  :value="Number(item.ratings)"
                  color="warning"
                  dense
                  half-increments
                  background-color="grey lighten-1"
                  readonly
                  size="18">
                </v-rating>
                <span class="grey--text text-body-1 ml-2"  >
                  {{ item.ratings }}
                </span>
              </p>
              <p class="d-flex" v-text="item.distance" style="color: #bdbdbd"></p>
            </v-col>
          </v-row>
  
          <v-divider :key="i"></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$store.getters.parks.length.toLocaleString() == 0">
          <v-list-item-content>
            <v-list-item-title>검색 결과가 없습니다.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      

      <!-- 페이지 번호 -->
      <div class="text-center">
        <v-pagination color="#558B2F" v-model="page" :length="numOfPages" :total-visible="7"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import HeaderBar from "../components/layout/HeaderBar.vue";
import Sort from "../components/layout/Sort.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderBar: HeaderBar,
    Sort: Sort,
  },
  data() {
   return {
     page: 1,
     dataPerPage: 10,
   }
  },
  computed: {
    startOffset() {
      return (this.page - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      console.log(this.$store.getters.parks.length);
      return Math.ceil(this.$store.getters.parks.length / this.dataPerPage);
    },
    calData() {
      return this.$store.getters.parks.slice(this.startOffset, this.endOffset);
    },
  },
  methods: {
    ...mapActions(["addMarkList"])
  }
}
</script>

<style>
</style>