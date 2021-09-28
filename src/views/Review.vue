<template>
  <v-dialog v-model="dialog" width="430">
    <!-- 별점 및 해시태그 등록 클릭 버튼 -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="d-flex justify-star ml-4" color="light-green darken-4" dark v-bind="attrs" v-on="on">
        별점 및 해시태그 등록하기
      </v-btn>
    </template>

    <!-- 모달창 start! 모달창 툴바 -->
    <v-card class="mx-auto" rounded="lg">
      <v-toolbar flat color="light-green darken-4" dark>
        <v-toolbar-title>별점 및 해시태그 등록하기</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- 해시태그 입력 내용 -->
      <v-card-text>
        <h2 class="text-h6 my-3 mb-2">해시태그를 선택하세요</h2>

        <v-chip-group
          v-model="hashtagRating"
          active-class="light-green darken-4 white--text"
          column
          multiple
        >
          <v-chip filter> 산책 </v-chip>
          <v-chip filter> 꽃 </v-chip>
          <v-chip filter> 자전거 </v-chip>
          <v-chip filter> 데이트 </v-chip>
          <v-chip filter> 운동 </v-chip>
          <v-chip filter> 주차장 </v-chip>
          <v-chip filter> 강아지 </v-chip>
          <v-chip filter> 도시공원 </v-chip>
          <v-chip filter> 자연공원 </v-chip>
          <v-chip filter> 기타 </v-chip>
        </v-chip-group>
      </v-card-text>

      <v-divider></v-divider>

      <!-- 별점 입력 내용 -->
      <v-card-text>
        <h2 class="text-h6 my-3 mb-2">공원 별점을 입력하세요</h2>

        <v-rating
          v-model="rating"
          background-color="grey darken-1"
          color="warning"
          empty-icon="$$ratingFull"
          half-increments
          hover
          length="5"
          size="40">
        </v-rating>
      </v-card-text>

      <v-divider></v-divider>

      <!-- 별점 및 해시태그 저장 버튼 -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" text @click="dialog = false">SAVE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      hashtagRating: [1], //해시태그 산책 선택 고정
      starRating: [],
      rating: 0, //기본 별점 고정

      dialog: false, //모달창 닫기
    }
  },
}
</script>

