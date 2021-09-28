<template>
<!-- Home.vue & Search.vue 화면에 들어가야 함 -->

<div class="HeaderBar">
  <!-- 배경이미지 -->
  <v-toolbar flat class="toolbarImage"
    prominent
    height="250px"
    src="@/assets/배경.jpg"
  >
  
  <!-- 공원모아 로고 -->
  <a bind: href="/home"> 
  <v-img
    alt="Logo"
    class="shrink mr-2"
    contain
    src="@/assets/gwmoa_logo.png"
    transition="scale-transition"
    width="200"
  />
  </a>
  
  <v-spacer></v-spacer>

  <!-- 즐겨찾기 & 열람목록 아이콘 -->
  <v-btn icon href="/markList">   
  <v-icon large color="rgb(219, 116, 75)">mdi-heart</v-icon>
  </v-btn>
  
  <v-btn icon href="/openList">
  <v-icon large color="80, 59, 27">mdi-format-list-bulleted-square</v-icon>
  </v-btn>

  <!-- 검색바 -->
  <template lang="ko">
    <head>
      <title>Document</title>
      <meta charset="UTF-8" />
      <meta name="Author" content="" />
      <meta name="Keywords" content="" />
      <meta name="Description" content="" />
      
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous"
      />
    </head>
    <body>
      <div class="search-box">
          <input
          v-bind:value="inputText"
          v-on:input="updateInput"
          type="text"
          class="search-txt"
          name=""
          placeholder="검색어를 입력하세요" 
          @keyup.enter="getinfo(inputText)" 
          />

           <a class="search-btn" @click="getinfo(inputText)">
            <i class="fas fa-search"></i>
          </a>
        </div>
    </body>
  </template>
    
  <!-- 사용자 위치 주소 아이콘 & 바 -->
    <div class="location">
      <!-- 아이콘 -->
      <v-btn
        class="ma-2" 
        color="#212121" 
        dark
        @click="getLocation()">
        <v-icon dark color="#E64A19"
                left
                size = 25>
                mdi-map-marker-radius
                </v-icon>
        <!-- 바 -->
        <v-card
          class="d-flex pa-0"
          outlined
          tile>
          <div v-if="$store.state.error && !$store.state.gettingLocation">서울특별시청 주소: {{$store.state.cityHall.latitude}}, {{ $store.state.cityHall.longitude}}</div>
          <div v-else-if="$store.state.gettingLocation">위치 가져오는 중...</div>
          <div v-else>사용자 위치 주소: {{latitude}}, {{longitude}}</div>
        </v-card>
      </v-btn>
    </div>

    </v-toolbar>
  </div>
</template>


<!-- 사용자 위치 가져오기 -->
<script> 
  import { mapGetters, mapActions } from "vuex";
  export default {
    data () {
        return {
            dialog: false,
            inputText: "",
        }
    },

    computed: { 
        ...mapGetters(["latitude", "longitude"])
    },

  methods: {
    ...mapActions(["getLocation", "getinfo"]),
    updateInput: function (e) {
      var updatedText = e.target.value
      this.inputText = updatedText
    },
  }
}
</script>


<style>
  /*검색바 스타일*/
  a {
    text-decoration: none;
  }
  .search-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e9e8e8;
    height: 60px;
    border-radius: 40px;
    padding: 10px;
  }
  .search-box:hover>.search-txt {
    width: 240px;
    padding: 0 6px;
  }
  .search-box:hover>.search-btn {
    background: #1e1e1e;
    color: white;
  }
  .search-btn {
    color: #d9d9d9;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f4032;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
  }
  .search-txt {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: #1e1e1e;
    font-size: 18px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
  }
  /* 위치 아이콘 & 바 스타일 */
  .location {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -20%);
    color: rgb(15, 75, 60);
    color: rgb(80, 59, 27);
  }
</style>
