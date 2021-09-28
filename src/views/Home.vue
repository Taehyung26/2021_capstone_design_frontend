<template>
  <div>
    <header>
      <title>d</title>
    </header>
    <HeaderBar />
    <v-container class="hash_tags">
      <a class="산책" @click="getinfo('산책')"><span>#산책</span></a>
      <a class="꽃" @click="getinfo('꽃')"><span>#꽃</span></a>
      <a class="자전거" @click="getinfo('자전거')"><span>#자전거</span></a>
      <a class="데이트" @click="getinfo('데이트')"><span>#데이트</span></a>
      <a class="도시공원" @click="getinfo('문화공원')"><span>#문화공원</span></a>
      <a class="자연공원" @click="getinfo('자연공원')"> <span>#자연공원</span></a>
      <a class="운동" @click="getinfo('운동')"><span>#운동</span></a>
      <a class="강아지" @click="getinfo('강아지')"><span>#강아지</span></a>
    </v-container>
  </div>
</template>

<script>

import HeaderBar from "../components/layout/HeaderBar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderBar: HeaderBar,
  },
  methods: {
    ...mapActions(["getinfo"]),
    
  },
};
</script>

 

<style>
/*해시태그 박스 모양 설정*/
.hash_tags > a {
  width: 20%;
  height: 40px;
  padding: 5% 0% 9% 0%;

  border-radius: 30px; /*모서리 설정*/
  /* border: 0px solid rgb(8, 8, 8); 테두리 */
  box-shadow: 0px 0px 10px 0px rgb(100, 99, 99); /*테두리 그림자*/
  background-color: white; /*배경*/
  display: block; /*글속성 박스로 바꾸기*/

  margin: 15px; /*해시태그 박스끼리 여백*/

  background-size: cover; /*이미지 사이즈*/
  background-position: center; /*이미지 배치*/

  /* 텍스트 설정 */
  color: white;
  text-decoration: none;
  text-align: center;
  font-size: xx-large;
  text-shadow: 2px 2px 2px black;
}

/*포인터 닿으면 텍스트 색상 */
.hash_tags > a:hover {
  color: rgb(185, 255, 194);
}

/*해시태그 박스 이미지 */
.산책 {
  background-image: 
    url("../assets/산책.png");}
.꽃 {
  background-image: 
    url("../assets/꽃.jpg");
}
.자전거 {
  background-image: 
    url("../assets/자전거.png");
}
.데이트 {
  background-image: 
    url("../assets/데이트.jpg");
}
.도시공원 {
  background-image: 
    url("../assets/도시공원.png");
}
.자연공원 {
  background-image: 
    url("../assets/자연공원.jpg");
}
.운동 {
  background-image: 
    url("../assets/운동.jpg");
}
.강아지 {
  background-image: 
    url("../assets/강아지.png");
}

/*해시태그 박스 배치*/
.hash_tags {
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  flex-wrap: wrap; /*자동줄바꿈, 페이지 가로길이만큼만 원이 들어감 */
  box-sizing: border-box; /*4개 박스가 나오게 설정했음*/

  margin: auto; /*div 가운데 오게하기*/
}

</style>