<script>

export default {}
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar>
        <v-toolbar-title>CUPET</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :to="{name:'searchQueue'}" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn :to="{name:'qrReaderView'}" icon>
          <v-icon>mdi-qrcode-scan</v-icon>
        </v-btn>
        <v-btn :to="{name:'productsView'}" icon>
          <v-icon>mdi-gas-station</v-icon>
        </v-btn>
        <v-btn :to="{name:'qrReaderView'}" icon>
          <v-icon>mdi-qrcode-scan</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{name:'login'}" color="primary"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
