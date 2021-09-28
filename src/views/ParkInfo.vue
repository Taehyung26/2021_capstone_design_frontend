<template>
  <div>
    <Header />

    <!-- 공원 상세정보 start-->
    <v-container fluid class="mx-auto my-10">
      <v-list-item>
        <v-list-item-content>
          <!-- 공원 이름 & 하트 아이콘  -->
          <v-row>
            <v-col class="ml-12 d-flex justify-start"> 
              <h1 style="color:#558B2F">{{item.parkname}}</h1>
            </v-col>
       
            <v-col cols="1" class="mr-12 d-flex justify-end">
              <v-item-group>
                <v-item >
                  <v-btn icon="icon" color="rgb(219, 116, 75)" class="align-self-center" >
                    <v-icon @click="addMarkList(JSON.stringify(item))"> 
                      {{ $store.state.markList.includes(JSON.stringify(item)) ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                  </v-btn>
                </v-item>
              </v-item-group>  
            </v-col> 
          </v-row>
  

          <v-divider />


          <v-row class="ma-3">
            <!-- 공원 이미지 & 별점(별점,평균 값) & 별점 리뷰 버튼-->
            <v-col cols="auto">
              <v-img class="ml-4"
                v-if="item.image !== null"
                :src="item.image"
                max-width="400" min-width="400" height="290"
                > 

              </v-img>
              <v-img class="ml-4"
                v-else
                src="@/assets/회색.png"
                max-width="400" min-width="400" height="290"
                >  
              </v-img> 
        
              <v-row class="d-flex align-center ma-3">
                <v-rating
                  :value="Number(item.ratings)"
                  color="warning"
                  dense
                  half-increments
                  background-color="grey lighten-1"
                  readonly
                  size="25">
                </v-rating>
                <caption class="grey--text text-body-1 ml-2">
                  {{ item.ratings }}
                </caption>
              </v-row>         

              <Review/> 
            </v-col>

            <!-- 공원 상세 정보들 : 이름, 사진, 해시태그, 거리, 주소, 개요, 면적, 주요시설, 운동기구, 전화번호, 안내도, 오시는길, 참고사항-->
            <v-col class="ml-7">
              <v-row>
                <v-col class="a d-flex justify-start font-italic" cols="12" style="color:#558B2F" v-text="'#'+item.division+' #'+item.district" > </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-start grey--text" cols="12" v-text="item.distance"></v-col>
              </v-row>
              <v-divider class= "mt-2 mb-6"/>
              
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-16" cols="auto">주소</v-col>
                <v-col class="b text-justify ml-5" v-text="item.address"></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-16" cols="auto">개요</v-col>
                <v-col class="b text-justify ml-5" v-text="item.overview"></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-13" cols="auto">면적(m²)</v-col>
                <v-col class="b text-justify" v-text="item.area"></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-13" cols="auto">주요시설</v-col>
                <v-col class="b text-justify" v-text="item.mainfacility" ></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-13" cols="auto">운동기구</v-col>
                <v-col class="b text-justify" v-text="item.goods"></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-13" cols="auto">전화번호</v-col>
                <v-col class="b text-justify" v-text="item.pnum"></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-16" cols="auto">안내도</v-col>
                <v-col class="b text-justify ml-1">
                  <v-img v-if="item.guidemap !== null" :src="item.guidemap" max-width="700px" max-height="700" contain/>
                  <div v-else>정보없음</div>
                </v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start mr-12" cols="auto">오시는 길</v-col>
                <v-col class="b text-justify" v-text="item.direction"></v-col>
              </v-row>
              <v-row class="cc">
                <v-col class="a d-flex justify-start" cols="auto">이용시 참고사항</v-col>
                <v-col class="b text-justify" v-text="item.notes"></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </div>
</template>

<script>
import Header from "../components/layout/Header.vue";
import Review from "./Review.vue";
import { mapActions } from "vuex";


export default {
  name: "ParkInfo",
  components: {
    Header: Header,
    Review: Review,
  },
  computed: {
    item() {
      console.log(JSON.parse(this.$route.query.item))
      return JSON.parse(this.$route.query.item) // 스트링으로 넘어온거 객체로 다시 파싱해서 쓸 수 있게'    
    }
  },
  mounted() {
    this.addOpenList(this.$route.query.item)
    console.log(JSON.parse(this.$route.query.item))
  },
  methods: {
      ...mapActions(["addOpenList", "addMarkList"])
  }
}
</script>

<style>
.a {
  color: black;
  font-weight: bolder;
  font-size: large;
}
</style>