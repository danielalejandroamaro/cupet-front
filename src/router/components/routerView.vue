<script>

export default {}
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-footer
        :padless="true"
      >
        <v-card
          flat
          tile
          width="100%"
          class="red lighten-1 text-center"
        >
          <v-card-text>
            <v-btn
              :key="icon"
              class="mx-4"
            >
              <v-icon size="24px">
                mdi-qrcode
              </v-icon>
              list
            </v-btn>
           <v-btn
              :key="icon"
              class="mx-4"
            >
              <v-icon size="24px">
                mdi-playlist-check
              </v-icon>
              list
            </v-btn>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-app-bar>
    <v-main>
      <router-view></router-view>

    </v-main>
  </v-app>
</template>

<style scoped>

</style>
