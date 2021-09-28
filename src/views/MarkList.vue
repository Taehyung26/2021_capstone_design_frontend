<template>
  <div>
    <Header />
    <Sort />

    <!--검색결과 list -->
    <v-container class="mx-auto mt-0" max-width="full">
      <h2 class="d-flex justify-start">즐겨찾기 목록</h2>
      <v-list>
        <v-list-item v-for="(item, i) in calData" :key="i" v-ripple>
          <v-list-item-content class="pb-0">
          <v-row>
            <!-- 공원 정보 : 사진,이름,주소,별점,거리순 -->
            <v-img class="parkImage" v-if="item.image !== null" :src="item.image" max-width="300" min-width="300" height="220"></v-img>
            <v-img class="parkImage" v-else src="../assets/회색.png" max-width="300" min-width="300" height="220"></v-img>   
            <v-col cols="7" class="ml-2" @click="$router.push({name: 'ParkInfo', query: {item: JSON.stringify(item)}})"> <!-- 파크인포 새로고침 해도 넘어오게 제이슨객체 스트링화-->
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
            <v-col class="align-self-center">
                <v-btn right @click="addMarkList(JSON.stringify(item))">삭제</v-btn>
            </v-col>
          </v-row>


     
          <v-divider :key="i"></v-divider>
            </v-list-item-content>

        </v-list-item>
        <v-lsit-item v-if="markList.length.toLocaleString() == 0">
          <v-list-item-content>
            <v-list-item-title>즐겨찾기에 추가한 공원이 없습니다.</v-list-item-title>
          </v-list-item-content>
        </v-lsit-item>
      </v-list>
      <!-- 페이지 번호 -->
      <div class="text-center">
        <v-pagination color="#558B2F" v-model="page" :length="numOfPages" :total-visible="7"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import Header from "../components/layout/Header.vue";
import Sort from "../components/layout/Sort.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Header: Header,
    Sort: Sort,
  },
  data() {
    return {
        page: 1,
        dataPerPage: 10,
    }
  },
  computed: {
    ...mapGetters(["markList"]),
    startOffset() {
      return (this.page - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      console.log(this.markList.length);
      return Math.ceil(this.markList.length / this.dataPerPage);
    },
    calData() {
      return this.markList.slice(this.startOffset, this.endOffset);
    },
  },
  methods: {
      ...mapActions(["addMarkList"])
  }
}
</script>