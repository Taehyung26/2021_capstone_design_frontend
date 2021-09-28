<template>
  <v-footer class="Footer" color="#558B2F">
    <v-row justify="center" no-gutters="no-gutters">
      <!-- <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text="text"
        rounded="rounded"
        class="my-2"
        :href = "link"
      >
        {{ link }}
      </v-btn> -->
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ 2021 }}
        —
        <strong>ParkMoa</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  // data: () => ({
  //   links: ["Home", "Location", "Team"],
  // }),
    
}

</script>

<style></style>